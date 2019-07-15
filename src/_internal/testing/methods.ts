import { PriorityQueue } from "../PriorityQueue";
import { numericGreaterFirst } from "../comparator";
import {
  createNumericSequentialSequence,
  createNumericRandomSequence,
} from "./utils";

export default function general<Ctor extends typeof PriorityQueue>({
  PriorityQueueCtor,
}: {
  PriorityQueueCtor: Ctor;
}): void {
  test(`${PriorityQueueCtor.name}: static from`, () => {
    const values: number[] = createNumericSequentialSequence({
      size: 100,
    });
    const expected = [...values].sort(numericGreaterFirst);
    const actual = Array(values.length);
    const pq: PriorityQueue<number> = PriorityQueueCtor.from(values, {
      comparator: numericGreaterFirst,
    });
    for (let i = values.length - 1; i >= 0; --i) {
      actual[i] = pq.pop();
    }
    expect(actual).toStrictEqual(expected);
  });

  test(`${PriorityQueueCtor.name}: clear`, () => {
    const values: number[] = createNumericSequentialSequence({ size: 3 });
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });
    for (const v of values) {
      pq.push(v);
    }
    pq.clear();
    expect(pq).toHaveLength(0);
  });

  test(`${PriorityQueueCtor.name}: toArray`, () => {
    const values: number[] = createNumericSequentialSequence({ size: 10 });
    const expected = [...values].sort(numericGreaterFirst);
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });
    for (const v of values) {
      pq.push(v);
    }
    expect(pq.toArray()).toStrictEqual(expected);
  });

  test(`${PriorityQueueCtor.name}: get length`, () => {
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });

    expect(pq).toHaveLength(0);
    pq.push(123);
    expect(pq).toHaveLength(1);
    pq.push(123);
    expect(pq).toHaveLength(2);
    pq.push(123);
    expect(pq).toHaveLength(3);
  });

  test(`${PriorityQueueCtor.name}: isEmpty`, () => {
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });

    expect(pq.isEmpty()).toBe(true);
    pq.push(123);
    expect(pq.isEmpty()).toBe(false);
  });

  test(`${PriorityQueueCtor.name}: merge`, () => {
    const aValues: number[] = createNumericRandomSequence({
      size: 10,
      seed: "aValues",
    });
    const bValues: number[] = createNumericRandomSequence({
      size: 10,
      seed: "bValues",
    });
    const a: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });
    for (const v of aValues) {
      a.push(v);
    }
    const b: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });
    for (const v of bValues) {
      b.push(v);
    }

    a.merge(b);

    const valueLength = aValues.length + bValues.length;
    const expected = [...aValues, ...bValues].sort(numericGreaterFirst);
    const actual = Array(valueLength);
    for (let i = valueLength - 1; i >= 0; --i) {
      actual[i] = a.pop();
    }
    expect(actual).toStrictEqual(expected);
  });
}
