/**
 * A signature definition of comparator.
 * This type has same to an argument of `Array#sort`.
 */
export type Comparator<T> = (a: T, b: T) => ComparatorResult;

/**
 * A type of comparator's result.
 */
export type ComparatorResult = 1 | 0 | -1 | number;

export function numericGreaterFirst(a: number, b: number): ComparatorResult {
  return a > b ? 1 : a < b ? -1 : 0;
}

export function dictOrderGreaterFirst(_a: {}, _b: {}): ComparatorResult {
  const a = _a.toString();
  const b = _b.toString();
  return a > b ? 1 : a < b ? -1 : 0;
}

export const defaultComparator = dictOrderGreaterFirst;
