import BinaryHeap from './BinaryHeap.js';
import SkewHeap from './SkewHeap.js';
import PairingHeap from './PairingHeap.js';

function PriorityQueue(options = {}) {
  if (typeof options === "function") {
    options = {
      comperator: options
    };
  }
  options.strategy = options.strategy || PriorityQueue.BinaryHeapStrategy;
  options.comperator = options.comperator || ((a, b) => {
      if ([a, b].every(x => typeof x === 'number')) return a - b; else {
        a = a.toString();
        b = b.toString();
        return (a === b) ? 0 : ((a < b) ? -1 : 1);
      }
    });

  switch (Number(options.strategy)) {
    case PriorityQueue.BinaryHeapStrategy:
      return new BinaryHeap(options.comperator);
      break;
    case PriorityQueue.SkewHeapStrategy:
      return new SkewHeap(options.comperator);
      break;
    case PriorityQueue.PairingHeapStrategy:
      return new PairingHeap(options.comperator);
      break;
    default:
      return new BinaryHeap(options.comperator);
  }
}

PriorityQueue.strategies = [
  'BinaryHeapStrategy',
  'SkewHeapStrategy',
  'PairingHeapStrategy',
];

PriorityQueue.strategies.forEach((x, i) => {
  PriorityQueue[x] = i;
});

export default PriorityQueue;
