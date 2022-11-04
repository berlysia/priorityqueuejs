import { numericGreaterFirst } from "../../comparator";
import { createNumericRandomSequence } from "../../testing/utils";
import type { PriorityQueueStatic } from "../../PriorityQueue";
import { currentTime } from "../util";

export default function pushPopNumRand<Ctor extends PriorityQueueStatic>(
  PriorityQueueCtor: Ctor,
  size: number,
  iterations: number
) {
  const pq = new PriorityQueueCtor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [] as number[],
    pop: [] as number[],
  };

  for (let j = iterations; j > 0; --j) {
    const sequence = createNumericRandomSequence({ size });
    const beforePush = currentTime();
    for (const i of sequence) {
      pq.push(i);
    }
    const afterPush = currentTime();
    result.push.push(afterPush - beforePush);

    const beforePop = currentTime();
    for (let i = size; i > 0; --i) {
      pq.pop();
    }
    const afterPop = currentTime();
    result.pop.push(afterPop - beforePop);
    pq.clear();
  }

  return result;
}
