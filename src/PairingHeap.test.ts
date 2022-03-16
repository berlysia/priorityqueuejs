import sharedTest from "./testing";
import { PairingHeap } from "./PairingHeap";

// eslint-disable-next-line jest/require-hook -- shared test
sharedTest({
  PriorityQueueCtor: PairingHeap,
  size: 100,
});
