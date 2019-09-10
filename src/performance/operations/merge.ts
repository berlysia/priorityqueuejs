import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";
import { PriorityQueue } from "../../PriorityQueue";

export default function merge<Ctor extends typeof PriorityQueue>(
  PriorityQueueCtor: Ctor,
  size: number,
  iterations: number
) {
  const result = [];
  for (let i = iterations; i > 0; --i) {
    const a = PriorityQueueCtor.from(
      Array.from({ length: size }, (_x, j) => j),
      {
        comparator: numericGreaterFirst,
      }
    );
    const b = PriorityQueueCtor.from(
      Array.from({ length: size }, (_x, j) => j),
      {
        comparator: numericGreaterFirst,
      }
    );
    const before = microseconds.now();
    a.merge(b);
    const after = microseconds.now();
    result.push(after - before);
  }
  return result;
}
