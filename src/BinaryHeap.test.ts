import sharedTest from "./testing";
import { BinaryHeap } from "./BinaryHeap";

// eslint-disable-next-line jest/require-hook -- shared test
sharedTest({
  PriorityQueueCtor: BinaryHeap,
  size: 100,
});
