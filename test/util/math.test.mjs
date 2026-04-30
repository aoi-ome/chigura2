import assert from "node:assert/strict";
import test from "node:test";

import { occursWithProbability, pickRandom } from "../../dist/util/math.js";

test("pickRandom returns the item selected by the random index", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.6;

  try {
    assert.equal(pickRandom(["a", "b", "c"]), "b");
  } finally {
    Math.random = originalRandom;
  }
});

test("pickRandom rejects an empty array", () => {
  assert.throws(() => pickRandom([]), {
    name: "RangeError",
    message: "items must not be empty.",
  });
});

test("occursWithProbability returns true when random is below the threshold", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.2;

  try {
    assert.equal(occursWithProbability(0.5), true);
  } finally {
    Math.random = originalRandom;
  }
});

test("occursWithProbability returns false when random is at or above the threshold", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.5;

  try {
    assert.equal(occursWithProbability(0.5), false);
  } finally {
    Math.random = originalRandom;
  }
});

test("occursWithProbability rejects values outside the 0 to 1 range", () => {
  assert.throws(() => occursWithProbability(-0.1), {
    name: "RangeError",
    message: "probability must be between 0 and 1.",
  });
  assert.throws(() => occursWithProbability(1.1), {
    name: "RangeError",
    message: "probability must be between 0 and 1.",
  });
});
