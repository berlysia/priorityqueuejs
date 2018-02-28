// @flow
import PriorityQueue from "./PriorityQueue";
import type { PriorityQueueOption } from "./PriorityQueue";
import type { Comparator } from "./comparator";

class LinkedList<T> {
  first: ?Node<T> = null;
  last: ?Node<T> = null;
  pushFirst(node: Node<T>): void {
    if (this.first) {
      node.nextSibling = this.first;
    } else {
      this.last = node;
    }
    this.first = node;
  }
  pushLast(node: Node<T>): void {
    if (this.last) {
      this.last.nextSibling = node;
    } else {
      this.first = node;
    }
    this.last = node;
  }
  popFirst(): Node<T> {
    if (!this.first) {
      throw new Error("LinkedList: popFirst() called for empty LinkedList");
    }
    const ret = this.first;
    this.first = this.first.nextSibling;
    ret.nextSibling = null;
    if (!this.first) {
      this.last = null;
    }
    return ret;
  }
  hasItem(): boolean {
    return Boolean(this.first);
  }
  isPairable(): boolean {
    return this.first !== this.last;
  }
}

type Node<T> = {
  value: T,
  nextSibling: ?Node<T>,
  children: LinkedList<T>,
};

function createNode<T>(value: T): Node<T> {
  return {
    value,
    nextSibling: null,
    children: new LinkedList(),
  };
}

function traverse<T>(node: ?Node<T>): Array<T> {
  if (!node) return [];

  return [
    node.value,
    ...traverse(node.children.first),
    ...traverse(node.nextSibling),
  ];
}

function mergeNode<T>(a: ?Node<T>, b: ?Node<T>, comp: Comparator<T>): ?Node<T> {
  if (!a || !b) return a || b;
  if (comp(a.value, b.value) < 0) {
    b.children.pushFirst(a);
    return b;
  }
  a.children.pushLast(b);
  return a;
}

function mergeChildren<T>(
  children: LinkedList<T>,
  workspace: LinkedList<T>,
  comp: Comparator<T>
): ?Node<T> {
  if (!children.hasItem()) return null;

  let current = children;
  let next = workspace;
  while (current.isPairable()) {
    while (current.hasItem()) {
      const x = current.popFirst();
      const y = current.hasItem() ? current.popFirst() : null;
      next.pushLast((mergeNode(x, y, comp): any)); // must be present
    }
    const tmp = current;
    current = next;
    next = tmp;
  }
  return current.popFirst();
}

/**
 * An implementation of Pairing Heap.
 */
export default class PairingHeap<T> extends PriorityQueue<T> {
  root: ?Node<T> = null;
  _length: number = 0;
  _workspace: LinkedList<T> = new LinkedList();

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
    this.root = mergeChildren(
      this.root.children,
      this._workspace,
      this.comparator
    );
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
