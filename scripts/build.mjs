import { build } from "@ncpa0cpl/nodepack";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const p = (str) => path.resolve(__dirname, "../", str);

async function main() {
  await build({
    srcDir: p("src"),
    outDir: p("dist"),
    tsConfig: p("tsconfig.json"),
    target: "ES2020",
    declarations: true,
    preset: {
      node: true,
    },
    formats: ["esm", "cjs"],
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
