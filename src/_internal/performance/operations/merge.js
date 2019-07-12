import microseconds from "microseconds";
import { numericGreaterFirst } from "../../comparator";

export default function merge(Ctor, size) {
  const result = [];
  for (let i = 100; i > 0; --i) {
    const a = Ctor.from(Array.from({ length: size }, (x, j) => j), {
      comparator: numericGreaterFirst,
    });
    const b = Ctor.from(Array.from({ length: size }, (x, j) => j), {
      comparator: numericGreaterFirst,
    });
    const before = microseconds.now();
    a.merge(b);
    const after = microseconds.now();
    result.push(after - before);
  }
  return result;
}
