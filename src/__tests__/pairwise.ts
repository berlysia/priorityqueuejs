import { numericGreaterFirst } from "../comparator";
import { BinaryHeap } from "../BinaryHeap";
import { PairingHeap } from "../PairingHeap";
import { SkewHeap } from "../SkewHeap";

const Ctors = [BinaryHeap, PairingHeap, SkewHeap];

for (const A of Ctors) {
  for (const B of Ctors) {
    describe(`${A.name} vs ${B.name}`, () => {
      it("mergable", () => {
        // @ts-ignore
        const a = new A({ comparator: numericGreaterFirst });
        a.push(1);
        a.push(3);
        a.push(5);

        // @ts-ignore
        const b = new B({ comparator: numericGreaterFirst });
        b.push(2);
        b.push(4);
        b.push(6);

        expect(a.toArray()).toStrictEqual([1, 3, 5]);
        expect(b.toArray()).toStrictEqual([2, 4, 6]);

        a.merge(b);

        expect(a.toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
        expect(b.toArray()).toStrictEqual([]);
        expect(a.pop()).toBe(6);
      });
    });
  }
}
