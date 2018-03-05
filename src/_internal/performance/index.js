import { performance } from "perf_hooks";
import * as statistics from "simple-statistics";
import { BinaryHeap, PairingHeap, SkewHeap } from "../../";
import operations from "./operations";

const HeapCtors = [BinaryHeap, PairingHeap, SkewHeap];
const tests = [...operations];

const getDuration = x => x.duration;
const stats = values => ({
  mean: statistics.mean(values),
  mode: statistics.mode(values),
  median: statistics.median(values),
  variance: statistics.variance(values),
  min: statistics.min(values),
  max: statistics.max(values),
});

const sizes = [100, 1000, 10000];

function runBenchmarks() {
  for (const test of tests) {
    for (const Ctor of HeapCtors) {
      for (const size of sizes) {
        const measures = test(Ctor, size);
        if (measures.length) {
          console.log(`\n#${size} ${test.name}:${Ctor.name}`);
          console.log(stats(measures.map(getDuration)));
        } else {
          const keys = Object.keys(measures);
          for (const key of keys) {
            console.log(`\n#${size} ${key}:${test.name}:${Ctor.name}`);
            console.log(stats(measures[key].map(getDuration)));
          }
        }
        performance.clearMeasures();
      }
    }
  }
}

runBenchmarks();
