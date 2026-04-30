import assert from "node:assert/strict";
import test from "node:test";

import { Locator } from "../dist/locator.js";

test("Locator.locate moves by the chosen step when the next position stays in bounds", () => {
  const locator = new Locator();
  const originalRandom = Math.random;
  const randomValues = [0.5, 0.5, 0.95, 0.95];
  Math.random = () => randomValues.shift();

  try {
    locator.relocate({
      size: { width: 20, height: 20 },
      fieldSize: { width: 100, height: 100 },
    });
    locator.locate({
      size: { width: 20, height: 20 },
      fieldSize: { width: 100, height: 100 },
    });

    assert.deepEqual(locator.getPosition(), { x: 44, y: 44 });
  } finally {
    Math.random = originalRandom;
  }
});

test("Locator.locate keeps the current position when the next step would leave the field", () => {
  const locator = new Locator();
  const originalRandom = Math.random;
  const randomValues = [0, 0, 0, 0];
  Math.random = () => randomValues.shift();

  try {
    locator.relocate({
      size: { width: 20, height: 20 },
      fieldSize: { width: 100, height: 100 },
    });
    locator.locate({
      size: { width: 20, height: 20 },
      fieldSize: { width: 100, height: 100 },
    });

    assert.deepEqual(locator.getPosition(), { x: 0, y: 0 });
  } finally {
    Math.random = originalRandom;
  }
});

test("Locator.locate clamps the current position when the field becomes smaller", () => {
  const locator = new Locator();
  const originalRandom = Math.random;
  const randomValues = [0.95, 0.95, 0, 0];
  Math.random = () => randomValues.shift();

  try {
    locator.relocate({
      size: { width: 20, height: 20 },
      fieldSize: { width: 100, height: 100 },
    });
    locator.locate({
      size: { width: 20, height: 20 },
      fieldSize: { width: 60, height: 60 },
    });

    assert.deepEqual(locator.getPosition(), { x: 36, y: 36 });
  } finally {
    Math.random = originalRandom;
  }
});

test("Locator.relocate chooses a position inside the available field", () => {
  const locator = new Locator();
  const originalRandom = Math.random;
  Math.random = () => 0.5;

  try {
    locator.relocate({
      size: { width: 20, height: 10 },
      fieldSize: { width: 100, height: 50 },
    });

    assert.deepEqual(locator.getPosition(), { x: 40, y: 20 });
  } finally {
    Math.random = originalRandom;
  }
});

test("Locator.relocate clamps positions when the cat is larger than the field", () => {
  const locator = new Locator();
  const originalRandom = Math.random;
  Math.random = () => 0.9;

  try {
    locator.relocate({
      size: { width: 120, height: 60 },
      fieldSize: { width: 100, height: 50 },
    });

    assert.deepEqual(locator.getPosition(), { x: 0, y: 0 });
  } finally {
    Math.random = originalRandom;
  }
});
