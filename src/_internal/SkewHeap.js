// @flow
import PriorityQueue from "./PriorityQueue";
import type { PriorityQueueOption } from "./PriorityQueue";
import type { Comparator } from "./comparator";

type Node<T> = {
  value: T,
  left: ?Node<T>,
  right: ?Node<T>,
};

function createNode<T>(value: T) {
  return {
    value,
    left: null,
    right: null,
  };
}

function traverse<T>(node: ?Node<T>) {
  if (!node) return [];
  return [...traverse(node.left), node.value, ...traverse(node.right)];
}

function merge<T>(a: ?Node<T>, b: ?Node<T>, comparator: Comparator<T>) {
  if (!(a && b)) return a || b;
  if (comparator(a.value, b.value) < 0) return merge(b, a, comparator);
  a.right = merge(a.right, b, comparator);
  const t: ?Node<T> = a.right;
  a.right = a.left;
  a.left = t;
  return a;
}

class SkewHeap<T> extends PriorityQueue<T> {
  root: ?Node<T> = null;
  _length: number = 0;

  static from(
    array: Array<T>,
    option: PriorityQueueOption<T> = {}
  ): SkewHeap<T> {
    const instance = new SkewHeap(option);
    for (let i = 0, l = array.length; i < l; ++i) {
      instance.push(array[i]);
    }
    return instance;
  }

  clear() {
    this._length = 0;
    this.root = null;
  }

  get length(): number {
    return this._length;
  }

  push(val: T): void {
    this.root = merge(this.root, createNode(val), this.comparator);
    this._length += 1;
  }

  top(): T {
    if (!this.root) {
      throw new Error("invalid operation: top() called for empty SkewHeap");
    }
    return this.root.value;
  }

  pop(): T {
    if (!this.root) {
      throw new Error("invalid operation: pop() called for empty SkewHeap");
    }
    const ret = this.root.value;
    this.root = merge(this.root.right, this.root.left, this.comparator);
    this._length -= 1;
    return ret;
  }

  merge(other: PriorityQueue<T>): void {
    if (other instanceof SkewHeap && this.comparator === other.comparator) {
      this.root = merge(this.root, other.root, this.comparator);
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

  isEmpty() {
    return !this.root;
  }
}

export default SkewHeap;
