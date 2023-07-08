import fs from "node:fs";
import { fileURLToPath } from "node:url";

let htmxSource: string | null = null;
let htmxLoadErr: unknown;

try {
  // @ts-expect-error
  if (typeof import.meta.resolve === "undefined") {
    throw new Error(
      "`import.meta.resolve` is not available. Make sure your node environment supports it, and has the experimental flag enabled.",
    );
  }

  const htmxModulePath = fileURLToPath(
    // @ts-expect-error
    await import.meta.resolve("htmx.org", import.meta.url),
  );
  htmxSource = fs.readFileSync(htmxModulePath, "utf8");
} catch (e) {
  htmxLoadErr = e;
}

const getHtmxSource = () => {
  if (htmxSource) {
    return htmxSource;
  }

  if (htmxLoadErr) {
    console.error(htmxLoadErr);
  }

  return "";
};

export const HtmxScript = () => {
  return <script>{getHtmxSource()}</script>;
};
