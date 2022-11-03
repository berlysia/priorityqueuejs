import type { Comparator } from "./comparator";

export class BasePriorityQueue {
  _kind: string;
  constructor(kind: string) {
    this._kind = kind;
  }
}

/**
 * Option structure of Priority Queue.
 */
export type PriorityQueueOption<T> = {
  comparator?: Comparator<T>;
};

/**
 * Static interface of Priority Queue.
 */
export type PriorityQueueStatic = {
  /**
   * Build priority queue from given array.
   */
  from: <T>(
    _array: T[],
    _option?: PriorityQueueOption<T>
  ) => PriorityQueueInstance<T>;

  /**
   * Constructor of Priority Queue, with the given 'comparator'.
   * 'comparator' should be same as Array.prototype.sort's argument.
   * Like this: (a, b) => (a == b ? 0 : (a < b ? -1 : 1));
   * If not, default function will be passed by PriorityQueue entrypoint.
   */
  new <T>(option?: PriorityQueueOption<T>): PriorityQueueInstance<T>;
};

/**
 * Instance interface of Priority Queue.
 */
export type PriorityQueueInstance<T> = {
  comparator: Comparator<T>;

  /**
   * Clear this priority queue.
   */
  clear: () => void;

  /**
   * Write out the priority queue content as an Array.
   */
  toArray: () => T[];

  /**
   * Returns size of the priority queue.
   */
  get length(): number;

  /**
   * Push the element to the priority queue and returns self.
   */
  push: (_value: T) => void;

  /**
   * Get the top element of the priority queue.
   */
  top: () => T;

  /**
   * Pop the top element of the priority queue.
   */
  pop: () => T;

  /**
   * Merge another priority queue into this.
   */
  merge: <Instance extends PriorityQueueInstance<T>>(_other: Instance) => void;

  /**
   * Returns the priority queue is empty or not.
   */
  isEmpty: () => boolean;
};
