import { now as microsecondsNow } from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import type { AbstractPriorityQueue } from "../../AbstractPriorityQueue";

export default function clear<Ctor extends typeof AbstractPriorityQueue>(
  PriorityQueueCtor: Ctor,
  size: number,
  iterations: number
) {
  const result = [];
  for (let i = iterations; i > 0; --i) {
    const pq = PriorityQueueCtor.from(
      Array.from({ length: size }, (_x, j) => j),
      {
        comparator: numericGreaterFirst,
      }
    );

    const before = microsecondsNow();
    pq.clear();
    const after = microsecondsNow();
    result.push(after - before);
  }
  return result;
}
