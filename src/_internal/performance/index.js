import * as builder from "yargs";
import * as statistics from "simple-statistics";
import { BinaryHeap, PairingHeap, SkewHeap } from "../../";
import operations from "./operations";

const { testCase, algorithm } = builder
  .option("t", {
    alias: "testCase",
    describe: "filter by test case name",
    type: "string",
  })
  .option("a", {
    alias: "algorithm",
    describe: "filter by algorithm name",
    type: "string",
  }).argv;

const HeapCtors = [BinaryHeap, PairingHeap, SkewHeap];
const tests = [...operations];

const stats = values => ({
  mean: statistics.mean(values),
  mode: statistics.mode(values),
  median: statistics.median(values),
  variance: statistics.variance(values),
  min: statistics.min(values),
  max: statistics.max(values),
});

const sizes = [100, 1000, 10000];

function runBenchmarks(ctorRegex, nameRegex) {
  for (const test of tests) {
    if (nameRegex && !nameRegex.test(test.name)) continue;
    for (const Ctor of HeapCtors) {
      if (ctorRegex && !ctorRegex.test(Ctor.name)) continue;
      for (const size of sizes) {
        const measures = test(Ctor, size);
        if (measures.length) {
          console.log(`\n#${size} ${test.name}:${Ctor.name}`);
          console.log(stats(measures));
        } else {
          const keys = Object.keys(measures);
          for (const key of keys) {
            console.log(`\n#${size} ${key}:${test.name}:${Ctor.name}`);
            console.log(stats(measures[key]));
          }
        }
      }
    }
  }
}

const nameRegex = testCase && new RegExp(testCase);
const ctorRegex = algorithm && new RegExp(algorithm);

runBenchmarks(ctorRegex, nameRegex);
