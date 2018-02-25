import { numericGreaterFirst, dictOrderGreaterFirst } from "../comparator";

import {
  createNumericSequentialSequence,
  createNumericShuffledSequence,
  createNumericRandomSequence,
} from "./utils";

import pushPop from "./pushPop";
import methods from "./methods";

export default function testSuite({ PriorityQueueCtor, size = 100 }: * = {}) {
  methods({ PriorityQueueCtor });

  test(`${PriorityQueueCtor.name}: numeric sequencial ${size} item`, () => {
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator: numericGreaterFirst,
      },
      sequence: createNumericSequentialSequence({ size }),
    });
  });

  test(`${PriorityQueueCtor.name}: numeric shuffled ${size} item`, () => {
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator: numericGreaterFirst,
      },
      sequence: createNumericShuffledSequence({ size }),
    });
  });

  test(`${PriorityQueueCtor.name}: numeric random ${size} item`, () => {
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator: numericGreaterFirst,
      },
      sequence: createNumericRandomSequence({ size }),
    });
  });

  test(`${
    PriorityQueueCtor.name
  }: numeric sequencial ${size} item by dict order`, () => {
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator: dictOrderGreaterFirst,
      },
      sequence: createNumericSequentialSequence({ size }),
    });
  });

  test(`${
    PriorityQueueCtor.name
  }: numeric shuffled ${size} item by dict order`, () => {
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator: dictOrderGreaterFirst,
      },
      sequence: createNumericShuffledSequence({ size }),
    });
  });

  test(`${
    PriorityQueueCtor.name
  }: numeric random ${size} item by dict order`, () => {
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator: dictOrderGreaterFirst,
      },
      sequence: createNumericRandomSequence({ size }),
    });
  });

  test(`${PriorityQueueCtor.name}: custom object ${size} item`, () => {
    const comparator = (a, b) => {
      const x = numericGreaterFirst(a.x, b.x);
      if (x) return x;
      const y = numericGreaterFirst(a.y, b.y);
      return y;
    };
    const xs = createNumericRandomSequence({ size, seed: "xSequence" });
    const ys = createNumericRandomSequence({ size, seed: "ySequence" });
    const sequence = xs.map((x, i) => ({ x, y: ys[i] }));
    pushPop({
      PriorityQueueCtor,
      option: {
        comparator,
      },
      sequence,
    });
  });
}
