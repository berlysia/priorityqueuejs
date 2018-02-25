declare module "priorityqueue" {
  class PriorityQueue<T> {
    static from<T>(array: T[], option?: PriorityQueueOption<T>): PriorityQueue<T>;
    constructor(option?: PriorityQueueOption<T>);
    clear(): void;
    toArray(): Array<T>;
    readonly length: number;
    push(value: T): void;
    enqueue(value: T): void;
    top(): T;
    peek(): T;
    pop(): T;
    dequeue(): T;
    merge(other: PriorityQueue<T>): void;
    isEmpty(): boolean;
  }

  type PriorityQueueOption<T> = {
    comparator?: Comparator<T>,
  };

  type Comparator<T> = {
    (a: T, b: T): number,
  };

  export class BinaryHeap<T> extends PriorityQueue<T> {}
  export class SkewHeap<T> extends PriorityQueue<T> {}
  export class PairingHeap<T> extends PriorityQueue<T> {}
  export default BinaryHeap;
}
