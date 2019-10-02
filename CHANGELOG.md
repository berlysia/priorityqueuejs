<a name="1.0.0-rc1"></a>
# [1.0.0-rc1](https://github.com/berlysia/priorityqueuejs/compare/v0.2.0...1.0.0-rc1) (2018-02-25)


### Bug Fixes

* **BinaryHeap:** now throw Error when call method to take out from empty priority queue ([286f48b](https://github.com/berlysia/priorityqueuejs/commit/286f48b))
* **type:** fix flow inference issue ([af2fb96](https://github.com/berlysia/priorityqueuejs/commit/af2fb96))
* **type:** top & pop returns non-null value ([bf19ebd](https://github.com/berlysia/priorityqueuejs/commit/bf19ebd))


### Code Refactoring

* export strategies directly ([671649e](https://github.com/berlysia/priorityqueuejs/commit/671649e))


### Features

* remove method 'meld' ([6e215a1](https://github.com/berlysia/priorityqueuejs/commit/6e215a1))
* **type:** add type definition file for flowtype & TypeScript ([0591984](https://github.com/berlysia/priorityqueuejs/commit/0591984))


### BREAKING CHANGES

* meld is no longer exist
* New manner of specifying a strategy.

Before:
```js
import PriorityQueue from 'priorityqueue';

const binaryHeap = new PriorityQueue({
  strategy: PriorityQueue.BinaryHeapStrategy
});
```

After:
```js
import PriorityQueue, { BinaryHeap } from 'priorityqueue';

const binaryHeap = new BinaryHeap();
PriorityQueue === BinaryHeap; // true
```

`PairingHeap` , `SkewHeap` also available.



<a name="0.2.0"></a>
# [0.2.0](https://github.com/berlysia/priorityqueuejs/compare/v0.1.0...v0.2.0) (2016-05-06)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/berlysia/priorityqueuejs/compare/v0.0.4...v0.1.0) (2015-08-02)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/berlysia/priorityqueuejs/compare/v0.0.3...v0.0.4) (2015-08-01)



<a name="0.0.3"></a>
## 0.0.3 (2015-08-01)



# [1.0.0-rc2](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc1...v1.0.0-rc2) (2019-09-15)


### Bug Fixes

* move global declaration file ([594907f](https://github.com/berlysia/priorityqueuejs/commit/594907f))
* suppress eslint rule ([e816c2d](https://github.com/berlysia/priorityqueuejs/commit/e816c2d))


### Code Refactoring

* **PairingHeap:** improve performance ([bef6e79](https://github.com/berlysia/priorityqueuejs/commit/bef6e79))


### Features

* clear after merge ([c7ce527](https://github.com/berlysia/priorityqueuejs/commit/c7ce527))
* now PairingHeap has stable order ([76719e7](https://github.com/berlysia/priorityqueuejs/commit/76719e7))


### Performance Improvements

* add filter ([60c3997](https://github.com/berlysia/priorityqueuejs/commit/60c3997))
* add simple performance mesurement codes ([34fa5fa](https://github.com/berlysia/priorityqueuejs/commit/34fa5fa))
* rewrite perf ([d92e147](https://github.com/berlysia/priorityqueuejs/commit/d92e147))
* separate perf case for Integer or Number ([19c4ea7](https://github.com/berlysia/priorityqueuejs/commit/19c4ea7))
* store results as files ([bd61d7c](https://github.com/berlysia/priorityqueuejs/commit/bd61d7c))


### BREAKING CHANGES

* **PairingHeap:** stability has gone



# [1.0.0-rc3](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc2...v1.0.0-rc3) (2019-09-16)



# [1.0.0-rc3.0](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc3...v1.0.0-rc3.0) (2019-10-02)


### Bug Fixes

* fix for lint ([986bc34](https://github.com/berlysia/priorityqueuejs/commit/986bc34))



# [1.0.0](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc3.0...v1.0.0) (2019-10-02)



