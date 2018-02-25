// @flow

import { defaultComparator } from "./comparator";
import type { Comparator } from "./comparator";

export type PriorityQueueOption<T> = {
  comparator?: Comparator<T>,
};

/* eslint-disable class-methods-use-this, flowtype/require-return-type */
export default class PriorityQueue<T> {
  comparator: Comparator<T>;
  static from(array: T[], option?: PriorityQueueOption<T>): PriorityQueue<T> {
    throw new Error("not implemented");
  }
  constructor({
    comparator = (defaultComparator: Comparator<any>),
  }: PriorityQueueOption<T> = {}) {
    this.comparator = comparator;
  }
  clear(): void {
    throw new Error("not implemented");
  }
  toArray(): Array<T> {
    throw new Error("not implemented");
  }
  get length(): number {
    throw new Error("not implemented");
  }
  push(value: T): void {
    throw new Error("not implemented");
  }
  enqueue(value: T): void {
    return this.push(value);
  }
  top(): T {
    throw new Error("not implemented");
  }
  peek(): T {
    return this.top();
  }
  pop(): T {
    throw new Error("not implemented");
  }
  dequeue(): T {
    return this.pop();
  }
  merge(other: PriorityQueue<T>): void {
    throw new Error("not implemented");
  }
  meld(other: PriorityQueue<T>): void {
    return this.merge(other);
  }
  isEmpty(): boolean {
    throw new Error("not implemented");
  }
}
/* eslint-enable class-methods-use-this, flowtype/require-return-type */
