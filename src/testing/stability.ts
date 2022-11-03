import { expect } from "vitest";
import type {
  AbstractPriorityQueue,
  PriorityQueueOption,
} from "../AbstractPriorityQueue";

type CustomObject = {
  value: number;
};

export default function stability<Ctor extends typeof AbstractPriorityQueue>({
  PriorityQueueCtor,
  option,
}: {
  PriorityQueueCtor: Ctor;
  option: PriorityQueueOption<CustomObject>;
}): void {
  const given = Array(10)
    .fill(5)
    .map((value, index) => ({ value, index }));
  const actual = Array(10);
  // @ts-expect-error
  const pq = new PriorityQueueCtor(option);
  for (const v of given) {
    pq.push(v);
  }
  for (let i = 0, l = given.length; i < l; ++i) {
    actual[i] = pq.pop();
  }
  expect(actual).toStrictEqual(given);
}
