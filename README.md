# PriorityQueue

An implementation of priority queue in javascript.

## Installation

```
npm install priorityqueue
```

## Example

```js
import PriorityQueue from "priorityqueue";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const numericCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

const comparator = (a, b) => {
  const x = numericCompare(a.x, b.x);
  const y = numericCompare(a.y, b.y);
  return x ? x : y;
};

const pq = new PriorityQueue({ comparator });

pq.push(new Point(4, 6));
pq.push(new Point(2, 3));
pq.push(new Point(5, 1));
pq.push(new Point(1, 2));
console.log(pq.pop()); // => {x: 5, y: 1}
console.log(pq.top()); // => {x: 4, y: 6}
pq.push(new Point(3, 4));
pq.push(new Point(6, 5));
console.log(pq.length); // => 5
console.log(pq.top()); // => {x: 6, y: 5}
```

## References

- [instance methods](http://berlysia.github.io/priorityqueuejs/types/index.PriorityQueueInstance.html)
- [static methods](http://berlysia.github.io/priorityqueuejs/types/index.PriorityQueueStatic.html)

## Variation

## BinaryHeap(default)

Binary heap is a simple and efficient in almost cases.

cons:

- slow with large amount of items(over 10k)
- slow in `merge` operation especially

## PairingHeap

pros:

- super fast in `merge` operation(constant time)

## SkewHeap

pros:

- super fast in `merge` operation(constant time)

Not to use:

- with sequence completely sorted

## Import specific implementation

```js
import PriorityQueue from "priorityqueue";
import BinaryHeap from "priorityqueue/BinaryHeap";
import PairingHeap from "priorityqueue/PairingHeap";
import SkewHeap from "priorityqueue/SkewHeap";

console.log(PriorityQueue === BinaryHeap); // => true
```
