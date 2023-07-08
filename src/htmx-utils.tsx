export const createBoundElements = <
  S extends keyof JSX.IntrinsicElements,
  T extends keyof JSX.IntrinsicElements,
>(
  id: string,
  Source: S,
  Target: T,
) => {
  return [
    (props: JSX.IntrinsicElements[S]) => (
      <Source {...(props as any)} hx-target={`#${id}`} />
    ),
    (props: JSX.IntrinsicElements[T]) => <Target {...(props as any)} id={id} />,
  ] as const;
};

/**
 * An `<script>` tag that loads the htmx source code from a CDN.
 *
 * The `src` attribute used is: `https://unpkg.com/htmx.org@1.9.2`.
 */
export const HtmxCdn = () => {
  return (
    <script
      src="https://unpkg.com/htmx.org@1.9.2"
      integrity="sha384-L6OqL9pRWyyFU3+/bjdSri+iIphTN/bvYyM37tICVyOJkWZLpP2vGn6VUEXgzg6h"
      crossorigin="anonymous"
    />
  );
};
