import { numericGreaterFirst } from "../../comparator";
import type { PriorityQueueStatic } from "../../PriorityQueue";
import { currentTime } from "../util";

export default function clear<Ctor extends PriorityQueueStatic>(
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

    const before = currentTime();
    pq.clear();
    const after = currentTime();
    result.push(after - before);
  }
  return result;
}
