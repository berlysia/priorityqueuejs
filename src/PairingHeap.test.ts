import sharedTest from "./testing";
import { PairingHeap } from "./PairingHeap";

sharedTest({
  PriorityQueueCtor: PairingHeap,
  size: 100,
});
