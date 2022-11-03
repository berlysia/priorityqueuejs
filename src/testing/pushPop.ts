import { expect } from "vitest";
import type {
  AbstractPriorityQueue,
  PriorityQueueOption,
} from "../AbstractPriorityQueue";

export default function general<T, Ctor extends typeof AbstractPriorityQueue>({
  PriorityQueueCtor,
  option,
  sequence,
}: {
  PriorityQueueCtor: Ctor;
  option: PriorityQueueOption<T>;
  sequence: T[];
}): void {
  const expected = [...sequence].sort(option.comparator);
  const actual = Array(sequence.length);
  // @ts-expect-error
  const pq = new PriorityQueueCtor(option);
  for (const v of sequence) {
    pq.push(v);
  }
  for (let i = sequence.length - 1; i >= 0; --i) {
    actual[i] = pq.pop();
  }
  expect(actual).toStrictEqual(expected);
}
