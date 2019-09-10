import { PriorityQueue, PriorityQueueOption } from "./PriorityQueue";

import { Comparator } from "./comparator";

type Node<T> = {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
};

function createNode<T>(value: T): Node<T> {
  return {
    value,
    left: null,
    right: null,
  };
}

function traverse<T>(node: Node<T> | null): T[] {
  if (!node) return [];
  return [...traverse(node.left), node.value, ...traverse(node.right)];
}

function merge<T>(
  a: Node<T> | null,
  b: Node<T> | null,
  comparator: Comparator<T>
): Node<T> | null {
  if (!a || !b) return a || b;
  if (comparator(a.value, b.value) < 0) {
    return merge(b, a, comparator);
  }
  a.right = merge(a.right, b, comparator);
  const t = a.right;
  a.right = a.left;
  a.left = t;
  return a;
}

/**
 * An implementation of Skew Heap.
 */
export class SkewHeap<T> extends PriorityQueue<T> {
  root: Node<T> | null = null;

  // eslint-disable-next-line @typescript-eslint/member-naming
  _length: number = 0;

  static from<U>(array: U[], option: PriorityQueueOption<U> = {}): SkewHeap<U> {
    const instance = new SkewHeap(option);
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

  toArray(): T[] {
    return traverse(this.root).sort(this.comparator);
  }

  isEmpty(): boolean {
    return !this.root;
  }
}
