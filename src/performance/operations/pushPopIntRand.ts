import { now as microsecondsNow } from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import { createNumericRandomSequence } from "../../testing/utils";
import type { AbstractPriorityQueue } from "../../AbstractPriorityQueue";

export default function pushPopIntRand<
  Ctor extends typeof AbstractPriorityQueue
>(PriorityQueueCtor: Ctor, size: number, iterations: number) {
  // @ts-expect-error
  const pq = new PriorityQueueCtor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [] as number[],
    pop: [] as number[],
  };

  for (let j = iterations; j > 0; --j) {
    const sequence = createNumericRandomSequence({ size }).map((x) =>
      Math.floor(x)
    );
    const beforePush = microsecondsNow();
    for (const i of sequence) {
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
