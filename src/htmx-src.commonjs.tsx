import fs from "node:fs";

let htmxSource: string | null = null;
let htmxLoadErr: unknown;

try {
  const htmxModulePath = require.resolve("htmx.org");
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
