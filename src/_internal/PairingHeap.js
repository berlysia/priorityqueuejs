// @flow
import PriorityQueue from "./PriorityQueue";
import type { PriorityQueueOption } from "./PriorityQueue";
import type { Comparator } from "./comparator";

type Node<T> = {
  value: T,
  nextSibling: ?Node<T>,
  leftMostChild: ?Node<T>,
};

function createNode<T>(value: T): Node<T> {
  return {
    value,
    nextSibling: null,
    leftMostChild: null,
  };
}

function traverse<T>(node: ?Node<T>): Array<T> {
  if (!node) return [];

  return [
    node.value,
    ...traverse(node.leftMostChild),
    ...traverse(node.nextSibling),
  ];
}

/** mutate first argument */
function mergeNode<T>(a: ?Node<T>, b: ?Node<T>, comp: Comparator<T>): ?Node<T> {
  if (!a || !b) return a || b;
  if (comp(a.value, b.value) < 0) {
    return mergeNode(b, a, comp);
  }
  b.nextSibling = a.leftMostChild;
  a.leftMostChild = b;
  return a;
}

function mergeChildren<T>(
  leftMostChild: ?Node<T>,
  comp: Comparator<T>
): ?Node<T> {
  let cursor = leftMostChild;
  let lastSibling = null;
  let first = null;
  let second = null;

  while (cursor) {
    // isolate first node & move cursor
    first = cursor;
    cursor = first.nextSibling;
    first.nextSibling = null;

    // isolate second node & move cursor
    second = cursor;
    if (second) {
      cursor = second.nextSibling;
      second.nextSibling = null;
    }

    // merge first pair
    first = mergeNode(first, second, comp);

    // collect merged siblings in reversed order
    (first: any).nextSibling = lastSibling; // first is clearly present
    lastSibling = first;
  }

  let revCursor = null;
  while (lastSibling) {
    // move revCursor
    revCursor = lastSibling;
    lastSibling = revCursor.nextSibling;

    // merge last pair
    revCursor = mergeNode(revCursor, cursor, comp);
    cursor = revCursor;
  }
  return cursor;
}

export default class PairingHeap<T> extends PriorityQueue<T> {
  root: ?Node<T> = null;
  _length: number = 0;

  static from(
    array: Array<T>,
    option: PriorityQueueOption<T> = {}
  ): PairingHeap<T> {
    const instance = new PairingHeap(option);
    for (let i = 0, l = array.length; i < l; ++i) {
      instance.push(array[i]);
    }
    return instance;
  }

  clear(): void {
    this._length = 0;
    this.root = null;
  }

  get length(): number {
    return this._length;
  }

  push(val: T): void {
    this.root = mergeNode(this.root, createNode(val), this.comparator);
    this._length += 1;
  }

  top(): T {
    if (!this.root) {
      throw new Error("invalid operation: top() called for empty PairingHeap");
    }
    return this.root.value;
  }

  pop(): T {
    if (!this.root) {
      throw new Error("invalid operation: pop() called for empty PairingHeap");
    }
    const ret = this.root.value;
    this.root = mergeChildren(this.root.leftMostChild, this.comparator);
    this._length -= 1;
    return ret;
  }

  merge(other: PriorityQueue<T>): void {
    if (other instanceof PairingHeap && this.comparator === other.comparator) {
      this.root = mergeNode(this.root, other.root, this.comparator);
      this._length += other.length;
      return;
    }
    for (let i = 0, a = other.toArray(), l = a.length; i < l; ++i) {
      this.push(a[i]);
    }
  }

  toArray(): Array<T> {
    return traverse(this.root).sort(this.comparator);
  }

  isEmpty(): boolean {
    return !this.root;
  }
}
