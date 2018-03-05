import { performance } from "perf_hooks";
import { numericGreaterFirst } from "../../comparator";

export default function pushPopDesc(Ctor, size) {
  const beforePush = "beforePush";
  const afterPush = "afterPush";
  const beforePop = "beforePop";
  const afterPop = "afterPop";

  const pq = new Ctor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [],
    pop: [],
  };

  for (let j = 100; j > 0; --j) {
    performance.mark(beforePush);
    for (let i = size; i > 0; --i) {
      pq.push(i);
    }
    performance.mark(afterPush);
    performance.measure("push", beforePush, afterPush);
    performance.clearMarks();

    performance.mark(beforePop);
    for (let i = size; i > 0; --i) {
      pq.pop();
    }
    performance.mark(afterPop);
    performance.measure("pop", beforePop, afterPop);
    performance.clearMarks();
    pq.clear();

    result.push.push(performance.getEntriesByName("push")[0]);
    result.pop.push(performance.getEntriesByName("pop")[0]);

    performance.clearMeasures();
  }

  return result;
}
