import fs from "fs";

const files = fs.readdirSync(__dirname).filter((x) => x !== "index.js");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const modules = files
  .map((x) => `./${x}`)
  .map(require)
  .map((x) => x.default);
export default modules;
