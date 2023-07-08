import type {} from "jsxte";

type HxBool = true | "true" | "false";

type HxSwapType =
  | "innerHTML"
  | "outerHTML"
  | "beforebegin"
  | "afterbegin"
  | "beforeend"
  | "afterend"
  | "delete"
  | "none";

type HwSwapModifier =
  | `transition:${HxBool}`
  | `swap:${string}`
  | `settle:${string}`
  | `scroll:${string}`
  | `show:${string}`
  | `focus-scroll:${HxBool}`;

type HxSwap = HxSwapType | `${HxSwapType} ${HwSwapModifier}`;

declare global {
  namespace JSXTE {
    interface BaseHTMLTagProps {
      /**
       * Add or remove progressive enhancement for links and forms.
       *
       * See more: {@link https://htmx.org/attributes/hx-boost/}
       */
      "hx-boost"?: HxBool;
      /**
       * Issues a `GET` to the specified URL, and swap the HTML into
       * the DOM using a swap strategy.
       *
       * See more: {@link https://htmx.org/attributes/hx-get/}
       */
      "hx-get"?: string;
      /**
       * Issues a `POST` to the specified URL, and swap the HTML into
       * the DOM using a swap strategy.
       *
       * See more: {@link https://htmx.org/attributes/hx-post/}
       */
      "hx-post"?: string;
      /**
       * Issues a `PUT` to the specified URL, and swap the HTML into
       * the DOM using a swap strategy.
       *
       * See more: {@link https://htmx.org/attributes/hx-put/}
       */
      "hx-put"?: string;
      /**
       * Issues a `PATCH` to the specified URL, and swap the HTML into
       * the DOM using a swap strategy.
       *
       * See more: {@link https://htmx.org/attributes/hx-patch/}
       */
      "hx-patch"?: string;
      /**
       * Issues a `DELETE` to the specified URL, and swap the HTML into
       * the DOM using a swap strategy.
       *
       * See more: {@link https://htmx.org/attributes/hx-delete/}
       */
      "hx-delete"?: string;
      /**
       * Handle any event with a script inline.
       *
       * See more: {@link https://htmx.org/attributes/hx-on/}
       */
      "hx-on"?: string;
      /**
       * Pushes the URL into the browser location bar, creating a new history
       * entry.
       *
       * See more: {@link https://htmx.org/attributes/hx-push-url/}
       */
      "hx-push-url"?: HxBool | string;
      /**
       * Select content to swap in from a response. The value of this attribute
       * is a CSS query selector of the element or elements to select from the
       * response.
       *
       * See more: {@link https://htmx.org/attributes/hx-select/}
       */
      "hx-select"?: string;
      /**
       * Select content to swap in from a response, out of band (somewhere
       * other than the target). The value of this attribute is comma
       * separated list of elements to be swapped out of band. This attribute
       * is almost always paired with hx-select.
       *
       * See more: {@link https://htmx.org/attributes/hx-select-oob/}
       */
      "hx-select-oob"?: string;
      /**
       * Controls how content is swapped.
       *
       * The possible values of this attribute are:
       * - `innerHTML` - The default, replace the inner html of the target
       *   element
       * - `outerHTML` - Replace the entire target element with the response
       * - `beforebegin` - Insert the response before the target element
       * - `afterbegin` - Insert the response before the first child of the
       *   target element
       * - `beforeend` - Insert the response after the last child of the target
       *   element
       * - `afterend` - Insert the response after the target element
       * - `delete` - Deletes the target element regardless of the response
       * - `none`- Does not append content from response (out of band items will
       *   still be processed).
       *
       * The hx-swap attributes supports modifiers for changing the behavior of
       * the swap.
       *
       * See more: {@link https://htmx.org/attributes/hx-swap/}
       */
      "hx-swap"?: HxSwap;
      /**
       * Marks content in a response to be out of band (should swap in
       * somewhere other than the target).
       *
       * See more: {@link https://htmx.org/attributes/hx-swap-oob/}
       */
      "hx-swap-oob"?: HxBool | HxSwap | `${HxSwap}, ${string}`;
      /**
       * Specifies the target element to be swapped. The value of this
       * attribute can be:
       *
       * - A CSS selector of the element to target
       * - `this` keyword, which indicates  that the element that the
       *   `hx-target` attribute is on is the target.
       * - `closest <CSS selector>` which will find the closest parent
       *   ancestor that matches the given CSS selector (e.g. `closest tr`
       *   will target the closest table row to the element).
       * - `find <CSS selector>` which will find the first child descendant
       *   element that matches the given CSS selector.
       * - `next <CSS selector>` which will scan the DOM forward for the first
       *   element that matches the given CSS selector. (e.g. `next .error`
       *   will target the closest following sibling element with `error` class)
       * - `previous <CSS selector>` which will scan the DOM backwards for the
       *   first element that matches the given CSS selector. (e.g p`revious
       *   .error` will target the closest previous sibling with `error` class)
       *
       * See more: {@link https://htmx.org/attributes/hx-target/}
       */
      "hx-target"?: string;
      /**
       * Specifies the event that triggers the request. A trigger value can be
       * one of the following:
       * - An event name (e.g. `click` or `my-custom-event`) followed by an
       *   event filter and a set of event modifiers
       * - A polling definition of the form `every <timing declaration>`
       * - A comma-separated list of such events
       *
       * See more: {@link https://htmx.org/attributes/hx-trigger/}
       */
      "hx-trigger"?: string;
      /**
       * Adds values to the parameters to submit with the request
       * (JSON-formatted).
       *
       * By default, the value of this attribute is a list of name-expression
       * values in JSON (JavaScript Object Notation) format.
       *
       * If you wish for `hx-vals` to evaluate the values given, you can prefix
       * the values with `javascript:` or `js:`.
       *
       * See more: {@link https://htmx.org/attributes/hx-vals/}
       */
      "hx-vals"?: string;
      /**
       * Shows a `confirm()` dialog before issuing a request.
       *
       * See more: {@link https://htmx.org/attributes/hx-confirm/}
       */
      "hx-confirm"?: string;
      /**
       * Disables htmx processing for the given node and any children nodes.
       *
       * See more: {@link https://htmx.org/attributes/hx-disable/}
       */
      "hx-disable"?: HxBool;
      /**
       * Control and disable automatic attribute inheritance for child nodes.
       * The value of this attribute can be a `*` to disable inheritance for
       * all attributes, or a space separated list of `hx-` attributes
       * to disable inheritance for.
       *
       * See more: {@link https://htmx.org/attributes/hx-disinherit/}
       */
      "hx-disinherit"?: string;
      /**
       * Changes the request encoding type.
       *
       * See more: {@link https://htmx.org/attributes/hx-encoding/}
       */
      "hx-encoding"?: string;
      /**
       * Extensions to use for this element. he value can be a single
       * extension name or a comma separated list of extensions to apply.
       *
       * See more: {@link https://htmx.org/attributes/hx-ext/}
       */
      "hx-ext"?: string;
      /**
       * Adds to the headers that will be submitted with the request.
       *
       * By default, the value of this attribute is a list of name-expression
       * values in JSON (JavaScript Object Notation) format.
       *
       * If you wish for hx-headers to evaluate the values given, you can
       * prefix the values with `javascript:` or `js:`.
       *
       * See more: {@link https://htmx.org/attributes/hx-headers/}
       */
      "hx-headers"?: string;
      /**
       * Prevent sensitive data being saved to the history cache.
       *
       * See more: {@link https://htmx.org/attributes/hx-history-elt/}
       */
      "hx-history"?: HxBool;
      /**
       * The element to snapshot and restore during history navigation.
       *
       * See more: {@link https://htmx.org/attributes/hx-history-elt/}
       */
      "hx-history-elt"?: HxBool;
      /**
       * Include additional data in requests. The value of this attribute
       * is a CSS query selector of the element or elements to include
       * in the query.
       *
       * See more: {@link https://htmx.org/attributes/hx-include/}
       */
      "hx-include"?: string;
      /**
       * The element to put the `htmx-request` class on during the request.
       *
       * The value of this attribute is a CSS query selector of the element
       * or elements to apply the class to, or the keyword `closest`, followed
       * by a CSS selector, which will find the closest matching parent
       * (e.g. `closest tr`).
       *
       * See more: {@link https://htmx.org/attributes/hx-indicator/}
       */
      "hx-indicator"?: string;
      /**
       * Filters the parameters that will be submitted with a request.
       *
       * The possible values of this attribute are:
       * - `*` - Include all parameters (default)
       * - `none` - Include no parameters
       * - `not <param-list>` - Include all except the comma separated list
       *   of parameter names
       * - `<param-list>` - Include all the comma separated list of parameter
       *   names
       *
       * See more: {@link https://htmx.org/attributes/hx-params/}
       */
      "hx-params"?: string;
      /**
       * Specifies elements to keep unchanged between requests.
       *
       * See more: {@link https://htmx.org/attributes/hx-preserve/}
       */
      "hx-preserve"?: string;
      /**
       * Shows a `prompt()` before submitting a request.
       *
       * See more: {@link https://htmx.org/attributes/hx-prompt/}
       */
      "hx-prompt"?: string;
      /**
       * Replace the URL in the browser location bar.
       *
       * The possible values of this attribute are:
       * - `true`, which replaces the fetched URL in the browser navigation bar.
       * - `false`, which disables replacing the fetched URL if it would
       *   otherwise be replaced due to inheritance.
       * - A URL to be replaced into the location bar. This may be relative or
       *   absolute, as per history.replaceState().
       *
       * See more: {@link https://htmx.org/attributes/hx-push-url/}
       */
      "hx-replace-url"?: HxBool | string;
      /**
       * The hx-request attribute allows you to configure various aspects of
       * the request via the following attributes:
       * - `timeout` - the timeout for the request, in milliseconds
       * - `credentials` - if the request will send credentials
       * - `noHeaders` - strips all headers from the request
       *
       * These attributes are set using a JSON-like syntax, e.g.:
       * `\"timeout\":100`.
       *
       * You may make the values dynamically evaluated by adding the
       * `javascript:` or `js:` prefix.
       *
       * See more: {@link https://htmx.org/attributes/hx-request/}
       */
      "hx-request"?: string;
      /**
       * Control how requests made by different elements are synchronized.
       *
       * The `hx-sync` attribute consists of a CSS selector to indicate the
       * element to synchronize on, followed optionally by a colon and then
       * by an optional syncing strategy. The available strategies are:
       *
       * - `drop` - drop (ignore) this request if an existing request is in
       *   flight (the default)
       * - `abort` - drop (ignore) this request if an existing request is in
       *   flight, and, if that is not the case, abort this request if another
       *   request occurs while it is still in flight
       * - `replace` - abort the current request, if any, and replace it with
       *   this request
       * - `queue` - place this request in the request queue associated with
       *   the given element
       *
       * The `queue` modifier can take an additional argument indicating
       * exactly how to queue:
       *
       * - `queue first` - queue the first request to show up while a request
       *   is in flight
       * - `queue last` - queue the last request to show up while a request
       *   is in flight
       * - `queue all` - queue all requests that show up while a request
       *   is in flight
       *
       * See more: {@link https://htmx.org/attributes/hx-sync/}
       */
      "hx-sync"?: string;
      /**
       * Force elements to validate themselves before a request.
       *
       * See more: {@link https://htmx.org/attributes/hx-validate/}
       */
      "hx-validate"?: HxBool;
    }
  }
}
