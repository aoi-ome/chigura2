export function pickRandom<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new RangeError("items must not be empty.");
  }

  return items[Math.floor(Math.random() * items.length)];
}

export function occursWithProbability(probability: number): boolean {
  if (probability < 0 || probability > 1) {
    throw new RangeError("probability must be between 0 and 1.");
  }

  return Math.random() < probability;
}
