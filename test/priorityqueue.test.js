import shuffleArray from "shuffle-array";
import range from "lodash.range";
import random from "seed-random";
import PriorityQueue from "../src/index.js";

const rng = random("priorityqueue");
const shuffle = arr => shuffleArray(arr, { rng });

describe("basic Priority Queue features", () => {
  const randCaseSize = 3;
  const caseSize = 100;
  let seqCase;
  let randomCases;
  let randomCasesAnswer;
  let myObjectCase;
  let myObjectCaseAnswer;
  let myObjectComp;

  beforeAll(() => {
    seqCase = shuffle(range(caseSize));

    randomCases = new Array(randCaseSize);
    randomCasesAnswer = new Array(randCaseSize);
    for (let i = 0; i < randCaseSize; ++i) {
      randomCases[i] = [];
      for (let j = 0, c = 0; j < caseSize; ++j) {
        if (!c) {
          randomCases[i].push(seqCase[j]);
          continue;
        }
        if (Math.random() < 0.5) {
          randomCases[i].push(seqCase[j]);
          j -= 1;
          c += 1;
          continue;
        }

        randomCases[i].push("pop");
      }
      randomCasesAnswer[i] = [];
      const t = [];
      for (const item of randomCases[i]) {
        if (item === "pop") {
          randomCasesAnswer[i].push(t.sort((a, b) => a - b).pop());
        } else {
          t.push(item);
        }
      }
    }

    myObjectCase = [];
    myObjectCaseAnswer = [];
    const xs = shuffle(range(caseSize));
    const ys = shuffle(range(caseSize));
    for (let i = 0; i < caseSize; ++i) {
      myObjectCase.push({
        x: xs[i],
        y: ys[i],
      });
      myObjectCaseAnswer.push({
        x: xs[i],
        y: ys[i],
      });
    }

    myObjectComp = (a, b) => (a.x - b.x ? a.x - b.x : a.y - b.y);
    myObjectCaseAnswer.sort((a, b) => myObjectComp(a, b));
  });

  for (const strategy in PriorityQueue.strategies) {
    describe(PriorityQueue.strategies[strategy], () => {
      let pq;
      beforeEach(() => {
        pq = new PriorityQueue({
          strategy: parseInt(strategy, 10),
        });
      });

      it(`sequencial ${caseSize} times push/pop`, () => {
        for (let i = 0; i < caseSize; ++i) {
          pq.push(seqCase[i]);
        }
        for (let expected = caseSize - 1; expected >= 0; --expected) {
          const actual = pq.pop();
          expect(actual).toBe(expected);
        }
      });

      for (let randCase = 0; randCase < randCaseSize; ++randCase) {
        it(`randomize ${caseSize} times push/pop #${randCase + 1}`, () => {
          let popCount = 0;
          for (let i = 0; i < caseSize; ++i) {
            if (randomCases[randCase][i] === "pop") {
              const expected = randomCasesAnswer[randCase][popCount];
              popCount += 1;
              const actual = pq.pop();
              expect(actual).toBe(expected);
            } else {
              pq.push(randomCases[randCase][i]);
            }
          }
        });
      }

      it("with user object", () => {
        const mpq = new PriorityQueue({
          strategy: parseInt(strategy, 10),
          comparator: myObjectComp,
        });

        for (let i = 0; i < caseSize; ++i) {
          mpq.push(myObjectCase[i]);
        }

        for (let i = caseSize - 1; i >= 0; --i) {
          const actual = mpq.pop();
          const expected = myObjectCaseAnswer[i];
          expect(actual).toEqual(expected);
        }
      });
    });
  }
});
