import fs from "fs";
import path from "path";
import pkgDir from "pkg-dir";
import { sync as mkdirpSync } from "mkdirp";
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
mkdirpSync(path.join(rootDir!, "perf_results"));

function createPadder(length: number, padder: string) {
  return function padNum(target: string) {
    return target.padStart(length, padder);
  };
}

function lengthInChar(target: number) {
  return Math.floor(Math.log10(target)) + 1;
}

function runBenchmarks(ctorRegex?: RegExp, nameRegex?: RegExp) {
  const testsToBeRun = nameRegex
    ? tests.filter((x) => nameRegex.test(x.name))
    : tests;
  const algorithmsToBeRun = ctorRegex
    ? HeapCtors.filter((x) => ctorRegex.test(x.name))
    : HeapCtors;
  const suitesCount =
    testsToBeRun.length * algorithmsToBeRun.length * sizes.length;

  console.log(`suitesCount: ${suitesCount}`);

  let done = 0;
  const padDone = createPadder(lengthInChar(suitesCount), "0");
  const padSize = createPadder(Math.max(...sizes.map(lengthInChar)), " ");
  const padAlgs = createPadder(
    Math.max(...HeapCtors.map((x) => x.name.length)),
    " "
  );

  for (const test of testsToBeRun) {
    for (const Ctor of algorithmsToBeRun) {
      for (const size of sizes) {
        console.log(
          `(${padDone(done.toString(10))}/${suitesCount}) name: ${
            test.name
          }, algorithm: ${padAlgs(Ctor.name)}, size: ${padSize(
            size.toString(10)
          )} -- start at ${new Date().toLocaleString()}`
        );
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
        done++;
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
