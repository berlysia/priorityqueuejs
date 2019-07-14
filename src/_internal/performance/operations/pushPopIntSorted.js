import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";

export default function pushPopIntSorted(Ctor, size) {
  const pq = new Ctor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [],
    pop: [],
  };

  for (let j = 100; j > 0; --j) {
    const beforePush = microseconds.now();
    for (let i = size; i > 0; --i) {
      pq.push(i);
    }
    const afterPush = microseconds.now();
    result.push.push(afterPush - beforePush);

    const beforePop = microseconds.now();
    for (let i = size; i > 0; --i) {
      pq.pop();
    }
    const afterPop = microseconds.now();
    result.pop.push(afterPop - beforePop);
    pq.clear();
  }

  return result;
}
