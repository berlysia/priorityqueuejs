import type {
  PriorityQueueInstance,
  PriorityQueueOption,
  PriorityQueueStatic,
} from "./PriorityQueue";
import { BasePriorityQueue } from "./PriorityQueue";

import type { Comparator } from "./comparator";
import { defaultComparator } from "./comparator";

type Node<T> = {
  value: T;
  nextSibling: Node<T> | null;
  firstChild: Node<T> | null;
};

function createNode<T>(value: T): Node<T> {
  return {
    value,
    nextSibling: null,
    firstChild: null,
  };
}

function traverse<T>(node: Node<T> | null): T[] {
  if (!node) return [];

  return [
    node.value,
    ...traverse(node.firstChild),
    ...traverse(node.nextSibling),
  ];
}

/** mutate first argument */
function mergeNode<T>(
  a: Node<T> | null,
  b: Node<T> | null,
  comp: Comparator<T>
): Node<T> | null {
  if (!a || !b) return a || b;
  if (comp(a.value, b.value) < 0) {
    return mergeNode(b, a, comp);
  }
  b.nextSibling = a.firstChild;
  a.firstChild = b;
  return a;
}

function mergeChildren<T>(
  firstChild: Node<T> | null,
  comp: Comparator<T>
): Node<T> | null {
  let cursor = firstChild;
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
    first!.nextSibling = lastSibling; // first is clearly present
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

export class PairingHeap<T>
  extends BasePriorityQueue
  implements PriorityQueueInstance<T>
{
  comparator: Comparator<T>;
  root: Node<T> | null = null;

  _length = 0;

  static from<U>(
    array: U[],
    option: PriorityQueueOption<U> = {}
  ): PairingHeap<U> {
    const instance = new PairingHeap(option);
    for (let i = 0, l = array.length; i < l; ++i) {
      instance.push(array[i]);
    }
    return instance;
  }

  constructor({ comparator = defaultComparator }: PriorityQueueOption<T> = {}) {
    super("PairingHeap");
    this.comparator = comparator;
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
    this.root = mergeChildren(this.root.firstChild, this.comparator);
    this._length -= 1;
    return ret;
  }

  merge<Instance extends PriorityQueueInstance<T>>(other: Instance): void {
    if (other instanceof PairingHeap && this.comparator === other.comparator) {
      this.root = mergeNode(this.root, other.root, this.comparator);
      this._length += other.length;
      other.clear();
      return;
    }
    for (let i = 0, a = other.toArray(), l = a.length; i < l; ++i) {
      this.push(a[i]);
    }
    other.clear();
  }

  toArray(): T[] {
    return traverse(this.root).sort(this.comparator);
  }

  isEmpty(): boolean {
    return !this.root;
  }
}
const check: PriorityQueueStatic = PairingHeap;
if (check === PairingHeap) {
  // noop
}
