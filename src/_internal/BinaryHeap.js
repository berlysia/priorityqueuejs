// @flow
import PriorityQueue from "./PriorityQueue";
import type { PriorityQueueOption } from "./PriorityQueue";
import type { Comparator } from "./comparator";

function heapify<T>(
  collection: T[],
  index: number,
  comparator: Comparator<T>
): void {
  const largestIndex = getLargestIndex(collection, index, comparator);

  if (largestIndex !== index) {
    // swap current & largest
    const t = collection[index];
    collection[index] = collection[largestIndex];
    collection[largestIndex] = t;
    heapify(collection, largestIndex, comparator);
  }
}

function getLargestIndex<T>(
  collection: T[],
  index: number,
  comparator: Comparator<T>
): number {
  const leftIndex = index * 2;
  const rightIndex = index * 2 + 1;
  let largestIndex = index;

  if (
    leftIndex < collection.length &&
    comparator(collection[largestIndex], collection[leftIndex]) < 0
  )
    largestIndex = leftIndex;
  if (
    rightIndex < collection.length &&
    comparator(collection[largestIndex], collection[rightIndex]) < 0
  )
    largestIndex = rightIndex;

  return largestIndex;
}

function heapifyAll<T>(instance: BinaryHeap<T>): void {
  for (let i = Math.floor(instance.collection.length / 2) - 1; i >= 0; --i) {
    heapify(instance.collection, i, instance.comparator);
  }
}

export default class BinaryHeap<T> extends PriorityQueue<T> {
  collection: Array<T> = [];

  static from(
    array: Array<T>,
    option: PriorityQueueOption<T> = {}
  ): BinaryHeap<T> {
    const instance = new BinaryHeap(option);
    instance.collection = Array.from(array);
    heapifyAll(instance);
    return instance;
  }

  clear(): void {
    this.collection.length = 0;
  }

  toArray(): Array<T> {
    return [...this.collection].sort(this.comparator);
  }

  get length(): number {
    return this.collection.length;
  }

  top(): ?T {
    return this.collection[0];
  }

  pop(): T {
    const ret = this.collection[0];
    if (1 < this.collection.length) {
      this.collection[0] = this.collection.pop();
      heapify(this.collection, 0, this.comparator);
    } else {
      this.collection.pop();
    }

    return ret;
  }

  push(value: T): void {
    this.collection.push(value);
    const arr = this.collection;
    for (
      let i = arr.length - 1;
      i > 0 && this.comparator(arr[Math.floor(i / 2)], arr[i]) < 0;
      i = Math.floor(i / 2)
    ) {
      const t = arr[i];
      arr[i] = arr[Math.floor(i / 2)];
      arr[Math.floor(i / 2)] = t;
    }
  }

  merge(other: PriorityQueue<T>): void {
    if (other instanceof BinaryHeap) {
      this.collection = this.collection.concat(other.collection);
    } else {
      this.collection = this.collection.concat(other.toArray());
    }
    heapifyAll(this);
  }

  isEmpty(): boolean {
    return !this.collection.length;
  }
}
