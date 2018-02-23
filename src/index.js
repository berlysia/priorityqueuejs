import BinaryHeap from "./BinaryHeap.js";
import SkewHeap from "./SkewHeap.js";
import PairingHeap from "./PairingHeap.js";

function PriorityQueue(givenOptions = {}) {
  let options = { ...givenOptions };
  if (typeof options === "function") {
    options = {
      comparator: options,
    };
  }
  options.strategy = options.strategy || PriorityQueue.BinaryHeapStrategy;
  options.comparator =
    options.comparator ||
    ((a, b) => {
      if ([a, b].every(x => typeof x === "number")) {
        return a > b ? 1 : a < b ? -1 : 0;
      }
      const aStr = a.toString();
      const bStr = b.toString();
      return aStr === bStr ? 0 : aStr < bStr ? -1 : 1;
    });

  switch (Number(options.strategy)) {
    case PriorityQueue.BinaryHeapStrategy:
      return new BinaryHeap(options.comparator);
    case PriorityQueue.SkewHeapStrategy:
      return new SkewHeap(options.comparator);
    case PriorityQueue.PairingHeapStrategy:
      return new PairingHeap(options.comparator);
    default:
      return new BinaryHeap(options.comparator);
  }
}

PriorityQueue.strategies = [
  "BinaryHeapStrategy",
  "SkewHeapStrategy",
  "PairingHeapStrategy",
];

PriorityQueue.strategies.forEach((x, i) => {
  PriorityQueue[x] = i;
});

export default PriorityQueue;
