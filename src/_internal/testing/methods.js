// @flow

import type PriorityQueue from "../PriorityQueue";
import { numericGreaterFirst } from "../comparator";
import {
  createNumericSequentialSequence,
  createNumericRandomSequence,
} from "./utils";

export default function general({
  PriorityQueueCtor,
}: {
  PriorityQueueCtor: Class<PriorityQueue<*>>,
}): void {
  test(`${PriorityQueueCtor.name}: static from`, () => {
    const values: Array<number> = createNumericSequentialSequence({
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
    expect(actual).toEqual(expected);
  });

  test(`${PriorityQueueCtor.name}: clear`, () => {
    const values: Array<number> = createNumericSequentialSequence({ size: 3 });
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });
    for (const v of values) {
      pq.push(v);
    }
    pq.clear();
    expect(pq.length).toEqual(0);
  });

  test(`${PriorityQueueCtor.name}: toArray`, () => {
    const values: Array<number> = createNumericSequentialSequence({ size: 10 });
    const expected = [...values].sort(numericGreaterFirst);
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });
    for (const v of values) {
      pq.push(v);
    }
    expect(pq.toArray()).toEqual(expected);
  });

  test(`${PriorityQueueCtor.name}: get length`, () => {
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });

    expect(pq.length).toBe(0);
    pq.push(123);
    expect(pq.length).toBe(1);
    pq.push(123);
    expect(pq.length).toBe(2);
    pq.push(123);
    expect(pq.length).toBe(3);
  });

  test(`${PriorityQueueCtor.name}: isEmpty`, () => {
    const pq: PriorityQueue<number> = new PriorityQueueCtor({
      comparator: numericGreaterFirst,
    });

    expect(pq.isEmpty()).toBeTruthy();
    pq.push(123);
    expect(pq.isEmpty()).toBeFalsy();
  });

  test(`${PriorityQueueCtor.name}: merge`, () => {
    const aValues: Array<number> = createNumericRandomSequence({
      size: 10,
      seed: "aValues",
    });
    const bValues: Array<number> = createNumericRandomSequence({
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
    expect(actual).toEqual(expected);
  });
}
