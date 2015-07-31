"use strict";
import AbstructHeap from './AbstructHeap.js';

class SkewHeapNode {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.value = val;
  }
}

function traverse(node) {
  if (!node) return [];
  return [...traverse(node.left), node.value, ...traverse(node.right)];
}

function count(node) {
  if (!node) return 0;
  return 1 + count(node.left) + count(node.right);
}

function meld(a, b, comp) {
  if (!(a && b)) return a || b;
  if (comp(a.value, b.value) < 0)
    [a, b] = [b, a];
  a.right = meld(a.right, b, comp);
  [a.left, a.right] = [a.right, a.left];
  return a;
}

class SkewHeap extends AbstructHeap {
  constructor(comp) {
    super(comp);
    this.root = null;
  }

  clear() {
    this.root = null;
  }

  toArray() {
    return traverse(this.root).sort(this.comp).reverse();
  }

  size() {
    return count(this.root);
  }

  push(val) {
    this.root = meld(this.root, new SkewHeapNode(val), this.comp);
    return this;
  }

  top() {
    return this.root.value;
  }

  pop() {
    const ret = this.root;
    this.root = meld(this.root.right, this.root.left, this.comp);
    return ret.value;
  }

  meld(other) {
    this.root = meld(this.root, other.root, this.comp);
    return this;
  }

  merge(other) {
    return this.meld(other);
  }

  empty() {
    return !!this.root;
  }
}

export default SkewHeap;
