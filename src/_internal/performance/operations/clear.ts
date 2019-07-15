import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import { PriorityQueue } from "../../PriorityQueue";

export default function clear<Ctor extends typeof PriorityQueue>(
  PriorityQueueCtor: Ctor,
  size: number
) {
  const result = [];
  for (let i = 100; i > 0; --i) {
    const pq = PriorityQueueCtor.from(
      Array.from({ length: size }, (_x, j) => j),
      {
        comparator: numericGreaterFirst,
      }
    );

    const before = microseconds.now();
    pq.clear();
    const after = microseconds.now();
    result.push(after - before);
  }
  return result;
}
