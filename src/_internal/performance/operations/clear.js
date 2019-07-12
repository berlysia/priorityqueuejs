import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";

export default function clear(Ctor, size) {
  const result = [];
  for (let i = 100; i > 0; --i) {
    const pq = Ctor.from(Array.from({ length: size }, (x, j) => j), {
      comparator: numericGreaterFirst,
    });

    const before = microseconds.now();
    pq.clear();
    const after = microseconds.now();
    result.push(after - before);
  }
  return result;
}
