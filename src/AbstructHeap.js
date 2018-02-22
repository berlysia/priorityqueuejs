"use strict";

class AbstructHeap {
  /**
   * Constructor of Priority Queue, with the given 'comparator'.
   * 'comparator' should be same as Array.prototype.sort's argument.
   * Like this: (a, b) => (a == b ? 0 : (a < b ? -1 : 1));
   * If not, default function will be passed by PriorityQueue entrypoint.
   * @param {Function}
   * @return {AbstractHeap<ElementType>}
   */
  constructor(comp) {
    this.comp = comp;
  }

  /**
   * Clear this priority queue.
   * @param {void}
   * @return {void}
   */
  clear() {
    throw "Not Implemented";
  }

  /**
   * Build priority queue from given array.
   * @param {Array}
   * @return {AbstractHeap<ElementType>}
   */
  from(array) {
    this.clear();
    for (let i = 0, l = array.length; i < l; ++i) this.push(array[i]);
    return this;
  }

  /**
   * Write out the priority queue content as an Array.
   * @param {void}
   * @return {Array<ElementType>}
   */
  toArray() {
    throw "Not Implemented";
  }

  /**
   * Returns size of the priority queue.
   * @param {void}
   * @return {Number}
   */
  size() {
    throw "Not Implemented";
    return 0;
  }

  /**
   * Push the element to the priority queue and returns self.
   * @param {ElementType}
   * @return {AbstructHash<ElementType>}
   */
  push(value) {
    throw "Not Implemented";
    return this;
  }

  /**
   * Enqueue the element to the priority queue and returns self. Alias of push().
   * @param {ElementType}
   * @return {AbstructHash<ElementType>}
   */
  enqueue(value) {
    return this.push(value);
  }

  /**
   * Get the top element of the priority queue.
   * @return {ElementType}
   */
  top() {
    throw "Not Implemented";
  }

  /**
   * Peek the top element of the priority queue. Alias of top().
   * @return {ElementType}
   */
  peek() {
    return this.top();
  }

  /**
   * Pop the top element of the priority queue.
   * @return {ElementType}
   */
  pop() {
    throw "Not Implemented";
  }

  /**
   * Dequeue the top element of the priority queue. Alias of pop().
   * @return {ElementType}
   */
  dequeue() {
    return this.pop();
  }

  /**
   * Returns the priority queue is empty or not.
   * @return {Boolean}
   */
  empty() {
    return this.size() === 0;
  }
}

export default AbstructHeap;
