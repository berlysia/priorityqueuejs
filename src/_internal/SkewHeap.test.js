import sharedTest from "./testing";
import PriorityQueue from "./SkewHeap";

sharedTest({
  PriorityQueueCtor: PriorityQueue,
  size: 100,
});
