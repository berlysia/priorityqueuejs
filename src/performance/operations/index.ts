import fs from "fs";

const files = fs.readdirSync(__dirname).filter((x) => !x.startsWith("index"));

const modules = files
  .map((x) => `./${x}`)
  .map(require)
  .map((x) => x.default);
export default modules;
