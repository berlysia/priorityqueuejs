import { numericGreaterFirst } from "../../comparator";
import type { PriorityQueueStatic } from "../../PriorityQueue";
import { currentTime } from "../util";

export default function pushPopIntReversed<Ctor extends PriorityQueueStatic>(
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
    const beforePush = currentTime();
    for (let i = 0, l = size; i < l; ++i) {
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
