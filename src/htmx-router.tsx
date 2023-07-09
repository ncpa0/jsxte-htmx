import type { IncomingHttpHeaders } from "http";
import type { ComponentApi } from "jsxte";
import { ErrorBoundary, defineContext, renderToHtmlAsync } from "jsxte";

const routerContext = defineContext<{
  isHtmxRequest: boolean;
  requestPath: string[];
  currentLocation: string[];
  forceLevel?: number;
}>();

export type RouterProps = JSXTE.PropsWithChildren<{
  requestPath: string;
  isHtmxRequest: boolean;
  forceLevel?: number;
}>;

export class ReturnRootInstead {
  constructor(public readonly html: string) {}
}

class ReturnSwitchInstead {
  constructor(public readonly html: string) {}
}

class HtmxRouter extends ErrorBoundary {
  constructor(props: RouterProps) {
    super(props);
  }

  render(props: RouterProps, api: ComponentApi) {
    api.ctx.set(routerContext, {
      isHtmxRequest: props.isHtmxRequest,
      requestPath: toSegments(props.requestPath, true),
      currentLocation: [],
      forceLevel: props.forceLevel,
    });

    return <>{props.children}</>;
  }

  onError(error: unknown) {
    if (error instanceof ReturnRootInstead) {
      return <>{error.html}</>;
    }

    throw error;
  }
}

enum Headers {
  CurrentPath = "HXRouter-Current-Path",
  TargetLevel = "HXRouter-Target-Level",
}

const getHeader = (
  headers: IncomingHttpHeaders,
  name: string,
  defaultValue: string,
) => {
  const entries = Object.entries(headers);
  const cmpName = name.toLowerCase();

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]!;

    if (key.toLowerCase() === cmpName) {
      return value as string;
    }
  }

  return defaultValue;
};

export const renderRouted = async (params: {
  element: JSX.Element;
  request: {
    path: string;
    headers: IncomingHttpHeaders;
  };
}) => {
  const { element, request } = params;

  const currentClientPath = getHeader(
    request.headers,
    Headers.CurrentPath,
    "/",
  );
  const clientTargetLevel = getHeader(
    request.headers,
    Headers.TargetLevel,
    "1",
  );
  const isHtmxRequest =
    getHeader(request.headers, "HX-Request", "false") === "true";

  const requestPath = request.path;

  const closestMatchingLevel = (() => {
    const currentSegments = toSegments(currentClientPath, true);
    const requestSegments = toSegments(requestPath, true);

    let l = 0;
    while (currentSegments[l] === requestSegments[l]) {
      l++;
    }

    return l + 1;
  })();

  const needsReTarget = closestMatchingLevel < Number(clientTargetLevel);

  const headers = isHtmxRequest
    ? {
        "HX-Retarget": `#htmx-sw-lvl-${
          needsReTarget ? closestMatchingLevel : clientTargetLevel
        }`,
      }
    : {};

  const html = await renderToHtmlAsync(
    <HtmxRouter
      isHtmxRequest={isHtmxRequest}
      requestPath={requestPath}
      forceLevel={
        isHtmxRequest && needsReTarget ? closestMatchingLevel : undefined
      }
    >
      {element}
    </HtmxRouter>,
  );

  return {
    html,
    headers,
    addHeaders: (response: {
      setHeader: (name: string, value: string) => void;
    }) => {
      Object.entries(headers).forEach(([name, value]) => {
        response.setHeader(name, value);
      });
    },
  };
};

const SwitchCtx = defineContext<{
  setDefault: (get: () => Promise<string>) => void;
}>();

export const HtmxSwitch = async (
  props: JSXTE.PropsWithChildren<{}>,
  api: ComponentApi,
) => {
  const routeCtx = api.ctx.getOrFail(routerContext);
  const level = routeCtx.currentLocation.length + 1;

  const render = async () => {
    try {
      let getDefaultRoute = async () => "";
      await api.renderAsync(
        <SwitchCtx.Provider
          value={{
            setDefault: (get) => {
              getDefaultRoute = get;
            },
          }}
        >
          {props.children}
        </SwitchCtx.Provider>,
      );
      return getDefaultRoute();
    } catch (e) {
      if (e instanceof ReturnSwitchInstead) {
        return e.html;
      }

      throw e;
    }
  };

  if (routeCtx.forceLevel != null) {
    if (routeCtx.forceLevel === level) {
      const children = await render();
      throw new ReturnRootInstead(children);
    }
  } else if (routeCtx.isHtmxRequest && routeCtx.requestPath.length === level) {
    const children = await render();
    throw new ReturnRootInstead(children);
  }

  return <div id={`htmx-sw-lvl-${level}`}>{await render()}</div>;
};

/**
 * Important: the `href` attribute of this component must always be an
 * absolute path.
 */
export const HtmxRouterLink = (props: JSX.IntrinsicElements["a"]) => {
  const { href, children, ...rest } = props;

  const hrefSegments = toSegments(href!, true);
  const targetLevel = hrefSegments.length;

  return (
    <a
      {...rest}
      href={href}
      hx-get={href}
      hx-target="this"
      hx-headers={`js:{"${Headers.TargetLevel}":"${targetLevel}","${Headers.CurrentPath}":window.location.pathname}`}
    >
      {children}
    </a>
  );
};

export type RouteProps = JSXTE.PropsWithChildren<{
  path: string;
  default?: boolean;
}>;

export const HtmxRoute = async (props: RouteProps, api: ComponentApi) => {
  const routeCtx = api.ctx.getOrFail(routerContext);

  const routeSegments = parseRoutePath(props.path);
  const path = routeCtx.requestPath.slice(routeCtx.currentLocation.length);

  if (matchRoute(path, routeSegments)) {
    api.ctx.update(routerContext, {
      currentLocation: routeCtx.currentLocation.concat(props.path),
    });

    throw new ReturnSwitchInstead(await api.renderAsync(<>{props.children}</>));
  } else if (props.default === true) {
    const switchCtx = api.ctx.getOrFail(SwitchCtx);
    switchCtx.setDefault(() => {
      return api.renderAsync(<>{props.children}</>);
    });
  }

  return <></>;
};

const toSegments = (path: string, omitWildcards: boolean) => {
  const segments = path.split("/").filter((s) => s.length);

  if (omitWildcards) {
    return segments.filter((s) => !s.startsWith(":"));
  }

  return segments;
};

const matchRoute = (path: string[], route: PathSegment[]): boolean => {
  if (path.length < route.length) {
    return false;
  }

  for (let i = 0; i < route.length; i++) {
    const segmentMatch = route[i]!;
    const pathSegment = path[i]!;

    if (segmentMatch.type === "static" && segmentMatch.value !== pathSegment) {
      return false;
    }
  }

  return true;
};

const parseRoutePath = (path: string) => {
  const segments = toSegments(path, false);

  return segments.reduce((acc, segment) => {
    if (segment.startsWith(":")) {
      return acc.concat({
        type: "param",
        name: segment.slice(1),
      });
    }

    return acc.concat({
      type: "static",
      value: segment,
    });
  }, [] as PathSegment[]);
};

type PathSegment =
  | {
      type: "param";
      name: string;
    }
  | {
      type: "static";
      value: string;
    };
