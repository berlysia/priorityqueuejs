import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import { createNumericRandomSequence } from "../../testing/utils";
import { PriorityQueue } from "../../PriorityQueue";

export default function pushPopIntRand<Ctor extends typeof PriorityQueue>(
  PriorityQueueCtor: Ctor,
  size: number
) {
  // @ts-ignore
  const pq = new PriorityQueueCtor({
    comparator: numericGreaterFirst,
  });

  const result = {
    push: [] as number[],
    pop: [] as number[],
  };

  for (let j = 100; j > 0; --j) {
    const sequence = createNumericRandomSequence({ size }).map(Math.floor);
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
