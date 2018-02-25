// @flow

import { defaultComparator } from "./comparator";
import type { Comparator } from "./comparator";

/**
 * Option structure of Priority Queue.
 */
export type PriorityQueueOption<T> = {
  comparator?: Comparator<T>,
};

/* eslint-disable class-methods-use-this, flowtype/require-return-type */
/**
 * An Abstract class of Priority Queue.
 */
export default class PriorityQueue<T> {
  comparator: Comparator<T>;

  /**
   * Build priority queue from given array.
   */
  static from(array: T[], option?: PriorityQueueOption<T>): PriorityQueue<T> {
    throw new Error("not implemented");
  }

  /**
   * Constructor of Priority Queue, with the given 'comparator'.
   * 'comparator' should be same as Array.prototype.sort's argument.
   * Like this: (a, b) => (a == b ? 0 : (a < b ? -1 : 1));
   * If not, default function will be passed by PriorityQueue entrypoint.
   */
  constructor({
    comparator = (defaultComparator: Comparator<any>),
  }: PriorityQueueOption<T> = {}) {
    this.comparator = comparator;
  }

  /**
   * Clear this priority queue.
   */
  clear(): void {
    throw new Error("not implemented");
  }

  /**
   * Write out the priority queue content as an Array.
   */
  toArray(): Array<T> {
    throw new Error("not implemented");
  }

  /**
   * Returns size of the priority queue.
   */
  get length(): number {
    throw new Error("not implemented");
  }

  /**
   * Push the element to the priority queue and returns self.
   */
  push(value: T): void {
    throw new Error("not implemented");
  }

  /**
   * Enqueue the element to the priority queue and returns self. Alias of push().
   */
  enqueue(value: T): void {
    return this.push(value);
  }

  /**
   * Get the top element of the priority queue.
   */
  top(): T {
    throw new Error("not implemented");
  }

  /**
   * Peek the top element of the priority queue. Alias of top().
   */
  peek(): T {
    return this.top();
  }

  /**
   * Pop the top element of the priority queue.
   */
  pop(): T {
    throw new Error("not implemented");
  }
  /**
   * Dequeue the top element of the priority queue. Alias of pop().
   */
  dequeue(): T {
    return this.pop();
  }

  /**
   * Merge another priority queue into this.
   */
  merge(other: PriorityQueue<T>): void {
    throw new Error("not implemented");
  }

  /**
   * Returns the priority queue is empty or not.
   */
  isEmpty(): boolean {
    throw new Error("not implemented");
  }
}
/* eslint-enable class-methods-use-this, flowtype/require-return-type */
