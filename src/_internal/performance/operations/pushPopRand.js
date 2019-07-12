import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import { createNumericRandomSequence } from "../../testing/utils";

export default function pushPopRand(Ctor, size) {
  const pq = new Ctor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [],
    pop: [],
  };

  for (let j = 100; j > 0; --j) {
    const sequence = createNumericRandomSequence({ size });
    const beforePush = microseconds.now();
    for (const i of sequence) {
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
