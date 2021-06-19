import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import type { PriorityQueue } from "../../PriorityQueue";

export default function pushPopNumSorted<Ctor extends typeof PriorityQueue>(
  PriorityQueueCtor: Ctor,
  size: number,
  iterations: number
) {
  // @ts-expect-error
  const pq = new PriorityQueueCtor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [] as number[],
    pop: [] as number[],
  };

  for (let j = iterations; j > 0; --j) {
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
