import shuffleArray from "shuffle-array";
import range from "lodash.range";
import random from "seed-random";

export function createNumericSequentialSequence({
  size = 100,
}: { size?: number } = {}): number[] {
  return range(0, size, 1);
}

export function createNumericShuffledSequence({
  size = 100,
  seed = "priorityqueue",
}: { size?: number; seed?: string } = {}): number[] {
  const rng = random(seed);
  return shuffleArray(createNumericSequentialSequence({ size }), { rng });
}

export function createNumericRandomSequence({
  size = 100,
  seed = "priorityqueue",
  min = 0,
  max = size,
}: {
  size?: number;
  seed?: string;
  min?: number;
  max?: number;
} = {}): number[] {
  const rng = random(seed);
  const duration = max - min;
  return Array.from({ length: size }, () => rng() * duration + min);
}
