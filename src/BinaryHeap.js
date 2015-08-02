"use strict";
import AbstructHeap from './AbstructHeap.js';

function _parent(i) {
  return i >> 1;
}
function _right(i) {
  return (i << 1) + 1;
}
function _left(i) {
  return (i << 1);
}

function heapify(arr, i, comp) {
  let l = _left(i);
  let r = _right(i);
  let largest;

  if (l < arr.length && comp(arr[i], arr[l]) < 0)
    largest = l;
  else
    largest = i;
  if (r < arr.length && comp(arr[largest], arr[r]) < 0)
    largest = r;

  if (largest !== i) {
    let t = arr[i];
    arr[i] = arr[largest];
    arr[largest] = t;
    return heapify(arr, largest, comp);
  }
}

class BinaryHeap extends AbstructHeap {
  constructor(comp) {
    super(comp);
    this.collection = [];
  }

  clear() {
    this.collection = [];
  }

  from(array) {
    this.collection = array.slice(0);
    for (let i = ~~(array.length / 2); i >= 0; --i)
      heapify(this.collection, i, this.comp);
    return this;
  }

  toArray() {
    return this.collection.sort(this.comp);
  }

  size() {
    return this.collection.length;
  }

  get length() {
    return this.collection.length;
  }

  push(value) {
    this.collection.push(value);
    const arr = this.collection;
    for (let i = arr.length - 1; i > 0 && this.comp(arr[_parent(i)], arr[i]) < 0; i = _parent(i)) {
      const t = arr[i];
      arr[i] = arr[_parent(i)];
      arr[_parent(i)] = t;
    }
    return this;
  };

  top() {
    return this.collection[0];
  }

  pop() {
    let ret = this.collection[0];
    if (1 < this.collection.length) {
      this.collection[0] = this.collection.pop();
      heapify(this.collection, 0, this.comp);
    } else {
      this.collection.pop();
    }

    return ret;
  };
}

export default BinaryHeap;
