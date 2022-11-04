# [2.0.0](https://github.com/berlysia/priorityqueuejs/compare/v2.0.0-0...v2.0.0) (2022-11-04)


### Features

* export type of option ([01ff281](https://github.com/berlysia/priorityqueuejs/commit/01ff2810dd2106b5da7de494aa4cb926d3a2c6b9))



# [2.0.0-0](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0...v2.0.0-0) (2022-11-04)


### Features

* bye abstract class ([28691af](https://github.com/berlysia/priorityqueuejs/commit/28691afcd457b3ed6f8a7ed00ca3287b85e1e6cb))
* rename PriorityQueue to AbstractPriorityQueue ([a21121c](https://github.com/berlysia/priorityqueuejs/commit/a21121c05fe5122ab821b5edf4760dcb097368f7))
* update exporting manner ([a67f555](https://github.com/berlysia/priorityqueuejs/commit/a67f555c2d482a8e65efa2183a513377100594d6))


### BREAKING CHANGES

* specific implementation is now provided in subdir
* remove alias methods



# [1.0.0](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc3.0...v1.0.0) (2019-10-02)



# [1.0.0-rc3.0](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc3...v1.0.0-rc3.0) (2019-10-02)


### Bug Fixes

* fix for lint ([986bc34](https://github.com/berlysia/priorityqueuejs/commit/986bc34f8cb48e7ea0c982101c1db535b69273d3))



# [1.0.0-rc3](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc2...v1.0.0-rc3) (2019-09-16)



# [1.0.0-rc2](https://github.com/berlysia/priorityqueuejs/compare/v1.0.0-rc1...v1.0.0-rc2) (2019-09-15)


### Bug Fixes

* move global declaration file ([594907f](https://github.com/berlysia/priorityqueuejs/commit/594907f42c4388e9e64571a1951621d177f48079))
* suppress eslint rule ([e816c2d](https://github.com/berlysia/priorityqueuejs/commit/e816c2dfb043d54a656c7d9b7751fcd365698aae))


### Code Refactoring

* **PairingHeap:** improve performance ([bef6e79](https://github.com/berlysia/priorityqueuejs/commit/bef6e79ad2ff4a185a4451b3d31f1e755c7487c7))


### Features

* clear after merge ([c7ce527](https://github.com/berlysia/priorityqueuejs/commit/c7ce527b976cbdae9a3949118345b14c58805279))
* now PairingHeap has stable order ([76719e7](https://github.com/berlysia/priorityqueuejs/commit/76719e7bf3710cf750933e881893239707a1a4a7))


### Performance Improvements

* add filter ([60c3997](https://github.com/berlysia/priorityqueuejs/commit/60c3997f889250414ed8015041416a6cd2e800c4))
* add simple performance mesurement codes ([34fa5fa](https://github.com/berlysia/priorityqueuejs/commit/34fa5fabadedf3b612ae4181747a23af79c9140a))
* rewrite perf ([d92e147](https://github.com/berlysia/priorityqueuejs/commit/d92e147f1bff7fff4b1b70ce9baaed272cda1e1e))
* separate perf case for Integer or Number ([19c4ea7](https://github.com/berlysia/priorityqueuejs/commit/19c4ea79c9d0b4c57018d458e8c63c0addff2b37))
* store results as files ([bd61d7c](https://github.com/berlysia/priorityqueuejs/commit/bd61d7c2ecb4c494f83b388ce8ae9a7325910052))


### BREAKING CHANGES

* **PairingHeap:** stability has gone



# [1.0.0-rc1](https://github.com/berlysia/priorityqueuejs/compare/v0.2.0...v1.0.0-rc1) (2018-02-25)


### Bug Fixes

* **BinaryHeap:** now throw Error when call method to take out from empty priority queue ([286f48b](https://github.com/berlysia/priorityqueuejs/commit/286f48b9f20a11246de1954a22a8d6f3729c5adf))
* **type:** fix flow inference issue ([af2fb96](https://github.com/berlysia/priorityqueuejs/commit/af2fb96c95ac66720c501614bf236e6f9591595f))
* **type:** top & pop returns non-null value ([bf19ebd](https://github.com/berlysia/priorityqueuejs/commit/bf19ebd20fdb34a738a6043065e3a4caccbbabe6))


### Code Refactoring

* export strategies directly ([671649e](https://github.com/berlysia/priorityqueuejs/commit/671649e72cad78e64accd1dc4ba88e1e41011f97))


### Features

* remove method 'meld' ([6e215a1](https://github.com/berlysia/priorityqueuejs/commit/6e215a1c02c4e5be76f377cbb1304ecfa8991a97))
* **type:** add type definition file for flowtype & TypeScript ([0591984](https://github.com/berlysia/priorityqueuejs/commit/0591984b974a8503fe68ad36ed5839caf475ea5e))


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



# [0.2.0](https://github.com/berlysia/priorityqueuejs/compare/v0.1.0...v0.2.0) (2016-05-06)



# [0.1.0](https://github.com/berlysia/priorityqueuejs/compare/v0.0.4...v0.1.0) (2015-08-02)



## [0.0.4](https://github.com/berlysia/priorityqueuejs/compare/v0.0.3...v0.0.4) (2015-08-01)



## 0.0.3 (2015-08-01)



