import { performance } from "perf_hooks";
import { numericGreaterFirst } from "../../comparator";

export default function merge(Ctor, size) {
  const before = "before";
  const after = "after";

  for (let i = 100; i > 0; --i) {
    const a = Ctor.from(Array.from({ length: size }, (x, j) => j), {
      comparator: numericGreaterFirst,
    });
    const b = Ctor.from(Array.from({ length: size }, (x, j) => j), {
      comparator: numericGreaterFirst,
    });
    performance.mark(before);
    a.merge(b);
    performance.mark(after);
    performance.measure(Ctor.name, before, after);
    performance.clearMarks();
  }
  const result = performance.getEntriesByType("measure");
  performance.clearMeasures();
  return result;
}
