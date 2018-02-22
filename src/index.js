import BinaryHeap from "./BinaryHeap.js";
import SkewHeap from "./SkewHeap.js";
import PairingHeap from "./PairingHeap.js";

function PriorityQueue(options = {}) {
  if (typeof options === "function") {
    options = {
      comparator: options
    };
  }
  options.strategy = options.strategy || PriorityQueue.BinaryHeapStrategy;
  options.comparator =
    options.comparator ||
    ((a, b) => {
      if ([a, b].every(x => typeof x === "number")) return a - b;
      a = a.toString();
      b = b.toString();
      return a === b ? 0 : a < b ? -1 : 1;
    });

  switch (Number(options.strategy)) {
    case PriorityQueue.BinaryHeapStrategy:
      return new BinaryHeap(options.comparator);
      break;
    case PriorityQueue.SkewHeapStrategy:
      return new SkewHeap(options.comparator);
      break;
    case PriorityQueue.PairingHeapStrategy:
      return new PairingHeap(options.comparator);
      break;
    default:
      return new BinaryHeap(options.comparator);
  }
}

PriorityQueue.strategies = [
  "BinaryHeapStrategy",
  "SkewHeapStrategy",
  "PairingHeapStrategy"
];

PriorityQueue.strategies.forEach((x, i) => {
  PriorityQueue[x] = i;
});

export default PriorityQueue;
