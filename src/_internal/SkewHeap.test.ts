import sharedTest from "./testing";
import { SkewHeap } from "./SkewHeap";

sharedTest({
  PriorityQueueCtor: SkewHeap,
  size: 100,
});
