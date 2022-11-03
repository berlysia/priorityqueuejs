import { now as microsecondsNow } from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import type { PriorityQueue } from "../../PriorityQueue";

export default function pushPopIntSorted<Ctor extends typeof PriorityQueue>(
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
    const beforePush = microsecondsNow();
    for (let i = size; i > 0; --i) {
      pq.push(i);
    }
    const afterPush = microsecondsNow();
    result.push.push(afterPush - beforePush);

    const beforePop = microsecondsNow();
    for (let i = size; i > 0; --i) {
      pq.pop();
    }
    const afterPop = microsecondsNow();
    result.pop.push(afterPop - beforePop);
    pq.clear();
  }

  return result;
}
