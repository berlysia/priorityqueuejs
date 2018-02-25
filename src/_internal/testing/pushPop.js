// @flow

import type PriorityQueue, { PriorityQueueOption } from "../PriorityQueue";

export default function general<T>({
  PriorityQueueCtor,
  option,
  sequence,
}: {
  PriorityQueueCtor: Class<PriorityQueue<T>>,
  option: PriorityQueueOption<T>,
  sequence: Array<T>,
}): void {
  const expected = [...sequence].sort(option.comparator);
  const actual = Array(sequence.length);
  const pq = new PriorityQueueCtor(option);
  for (const v of sequence) {
    pq.push(v);
  }
  for (let i = sequence.length - 1; i >= 0; --i) {
    actual[i] = pq.pop();
  }
  expect(actual).toEqual(expected);
}
