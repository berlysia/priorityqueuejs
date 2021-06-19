import fs from "fs";
import path from "path";
import pkgDir from "pkg-dir";
import mkdirp from "mkdirp";
import builder from "yargs";
import * as statistics from "simple-statistics";
import { BinaryHeap, PairingHeap, SkewHeap } from "..";
import operations from "./operations";

const { testCase, algorithm } = builder
  .option("testCase", {
    alias: "t",
    describe: "filter by test case name",
    type: "string",
  })
  .option("algorithm", {
    alias: "a",
    describe: "filter by algorithm name",
    type: "string",
  })
  .parseSync();

const HeapCtors = [BinaryHeap, PairingHeap, SkewHeap];
const tests = [...operations];

const stats = (values: number[]) => ({
  mean: statistics.mean(values),
  mode: statistics.mode(values),
  median: statistics.median(values),
  variance: statistics.variance(values),
  min: statistics.min(values),
  max: statistics.max(values),
});

const sizes = [100, 1000, 10000];
const iterations = 10000;
const rootDir = pkgDir.sync();
mkdirp.sync(path.join(rootDir!, "perf_results"));

function runBenchmarks(ctorRegex?: RegExp, nameRegex?: RegExp) {
  for (const test of tests) {
    if (nameRegex && !nameRegex.test(test.name)) continue;
    for (const Ctor of HeapCtors) {
      if (ctorRegex && !ctorRegex.test(Ctor.name)) continue;
      for (const size of sizes) {
        const measures = test(Ctor, size, iterations);
        if (measures.length) {
          const result = stats(measures);
          fs.writeFileSync(
            path.join(
              rootDir!,
              "perf_results",
              `${Ctor.name}-${test.name}-${size}.json`
            ),
            JSON.stringify(result, null, 2),
            "utf-8"
          );
        } else {
          const keys = Object.keys(measures);
          for (const key of keys) {
            const result = stats(measures[key]);
            fs.writeFileSync(
              path.join(
                rootDir!,
                "perf_results",
                `${Ctor.name}-${test.name}-${key}-${size}.json`
              ),
              JSON.stringify(result, null, 2),
              "utf-8"
            );
          }
        }
      }
    }
  }
}

const nameRegex =
  typeof testCase === "string" && testCase ? new RegExp(testCase) : undefined;
const ctorRegex =
  typeof algorithm === "string" && algorithm
    ? new RegExp(algorithm)
    : undefined;

runBenchmarks(ctorRegex, nameRegex);
