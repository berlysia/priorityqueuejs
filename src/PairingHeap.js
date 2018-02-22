"use strict";
import AbstructHeap from "./AbstructHeap.js";

class PairingHeapNode {
  constructor(val) {
    this.value = val;
    this.head = null;
    this.next = null;
  }
}

function traverse(node) {
  if (!node) return [];
  return [node.value, ...traverse(node.next), ...traverse(node.head)];
}

function count(node) {
  if (!node) return 0;
  return 1 + count(node.head) + count(node.next);
}

function merge(a, b, comp) {
  if (!(a && b)) return a || b;
  if (comp(a.value, b.value) < 0) [a, b] = [b, a];
  b.next = a.head;
  a.head = b;
  return a;
}

function mergeList(s, comp) {
  const n = new PairingHeapNode(null);
  while (s) {
    let a = s,
      b = null;
    s = s.next;
    a.next = null;
    if (s) {
      b = s;
      s = s.next;
      b.next = null;
    }
    a = merge(a, b, comp);
    a.next = n.next;
    n.next = a;
  }
  while (n.next) {
    const j = n.next;
    n.next = n.next.next;
    s = merge(j, s, comp);
  }
  return s;
}

class PairingHeap extends AbstructHeap {
  constructor(comp) {
    super(comp);
    this.root = null;
    this._length = 0;
  }

  clear() {
    this._length = 0;
    this.root = null;
  }

  toArray() {
    return traverse(this.root)
      .sort(this.comp)
      .reverse();
  }

  size() {
    return this._length;
  }

  get length() {
    return this._length;
  }

  push(val) {
    this.root = merge(this.root, new PairingHeapNode(val), this.comp);
    ++this._length;
    return this;
  }

  top() {
    return this.root.value;
  }

  pop() {
    const ret = this.root.value;
    this.root = mergeList(this.root.head, this.comp);
    --this._length;
    return ret;
  }

  meld(other) {
    this.root = merge(this.root, other.root, this.comp);
    this._length += other.length;
    return this;
  }

  merge(other) {
    return this.meld(other);
  }

  empty() {
    return Boolean(this.root);
  }
}

export default PairingHeap;
