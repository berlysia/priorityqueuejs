import { PriorityQueue, PriorityQueueOption } from "../PriorityQueue";

type CustomObject = {
  value: number;
};

export default function stability<Ctor extends typeof PriorityQueue>({
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
  // @ts-ignore
  const pq = new PriorityQueueCtor(option);
  for (const v of given) {
    pq.push(v);
  }
  for (let i = 0, l = given.length; i < l; ++i) {
    actual[i] = pq.pop();
  }
  expect(actual).toStrictEqual(given);
}
