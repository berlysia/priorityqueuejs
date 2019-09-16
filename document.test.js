/* eslint-disable max-nested-callbacks */
const fs = require("fs");
const path = require("path");
const { test } = require("@power-doctest/tester");
const { parse } = require("@power-doctest/markdown");
const { transformSync } = require("@babel/core");

const transform = code => {
  const result = transformSync(code, {
    babelrc: false,
    presets: [["@babel/env", { targets: { node: "current" } }]],
  }).code;
  return result.replace('require("priorityqueue")', 'require("./lib/cjs")');
};

describe("doctest:md", function() {
  const sourceDir = path.join(__dirname, ".");
  const files = ["README.md"];

  files.forEach(filePath => {
    const normalizeFilePath = filePath.replace(sourceDir, "");
    describe(`${normalizeFilePath}`, function() {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsedCodes = parse({
        filePath,
        content,
      });
      // try to eval
      const dirName = path
        .dirname(filePath)
        .split(path.sep)
        .pop();
      parsedCodes.forEach((parsedCode, _index) => {
        const codeValue = parsedCode.code;
        const testCaseName = codeValue.slice(0, 32).replace(/[\r\n]/g, "_");
        it(`${dirName}: ${testCaseName}`, function() {
          // eslint-disable-next-line jest/consistent-test-it,jest/no-test-return-statement
          return test(
            {
              ...parsedCode,
              code: transform(parsedCode.code),
            },
            {
              defaultDoctestRunnerOptions: {
                // Default timeout: 2sec
                timeout: 1000 * 2,
              },
            }
          ).catch(error => {
            const filePathLineColumn = `${error.fileName}:${error.lineNumber}:${error.columnNumber}`;
            console.error(`Markdown Doctest is failed
  at ${filePathLineColumn}

----------
${codeValue}
----------
`);
            return Promise.reject(error);
          });
        });
      });
    });
  });
});
