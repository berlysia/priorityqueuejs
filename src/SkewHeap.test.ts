import sharedTest from "./testing";
import { SkewHeap } from "./SkewHeap";

// eslint-disable-next-line jest/require-hook -- shared test
sharedTest({
  PriorityQueueCtor: SkewHeap,
  size: 100,
});
