// @flow

export type Comparator<T> = (a: T, b: T) => ComparatorResult;
export type ComparatorResult = Greater | Equal | Less;
export type Greater = 1;
export type Equal = 0;
export type Less = -1;

export function numericGreaterFirst(a: number, b: number): ComparatorResult {
  return a > b ? 1 : a < b ? -1 : 0;
}

export function dictOrderGreaterFirst(
  _a: Object, // eslint-disable-line flowtype/no-weak-types
  _b: Object // eslint-disable-line flowtype/no-weak-types
): ComparatorResult {
  const a = _a.toString();
  const b = _b.toString();
  return a > b ? 1 : a < b ? -1 : 0;
}

export const defaultComparator = dictOrderGreaterFirst;
