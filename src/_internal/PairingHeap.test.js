import sharedTest from "./testing";
import stability from "./testing/stability";
import PriorityQueue from "./PairingHeap";
import { numericGreaterFirst } from "./comparator";

sharedTest({
  PriorityQueueCtor: PriorityQueue,
  size: 100,
});

stability({
  PriorityQueueCtor: PriorityQueue,
  option: {
    comparator: (a, b) => numericGreaterFirst(a.value, b.value),
  },
});
