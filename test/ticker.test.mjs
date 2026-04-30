import assert from "node:assert/strict";
import test from "node:test";

import { Ticker } from "../dist/ticker.js";

function createFakeTimers() {
  let nextId = 1;
  const timers = new Map();
  const clearedIds = [];

  return {
    clearedIds,
    setTimeout(callback, delay) {
      const id = nextId;
      nextId += 1;
      timers.set(id, { callback, delay });
      return id;
    },
    clearTimeout(id) {
      clearedIds.push(id);
      timers.delete(id);
    },
    getTimer(id) {
      return timers.get(id);
    },
    getPendingCount() {
      return timers.size;
    },
    run(id) {
      const timer = timers.get(id);
      if (!timer) {
        throw new Error(`Timer ${id} is not scheduled.`);
      }

      timers.delete(id);
      timer.callback();
    },
  };
}

test("Ticker plays immediately and continues until the count is reached", () => {
  const fakeTimers = createFakeTimers();
  let tickCount = 0;
  const ticker = new Ticker({
    tick: () => (tickCount += 1),
    tickCount: 3,
    tickIntervalMs: 120,
    timeoutApi: fakeTimers,
  });

  ticker.play();
  assert.equal(tickCount, 1);
  assert.equal(fakeTimers.getPendingCount(), 1);
  assert.equal(fakeTimers.getTimer(1).delay, 120);

  fakeTimers.run(1);
  assert.equal(tickCount, 2);
  assert.equal(fakeTimers.getPendingCount(), 1);

  fakeTimers.run(2);
  assert.equal(tickCount, 3);
  assert.equal(fakeTimers.getPendingCount(), 0);
});

test("Ticker.stop cancels the scheduled timer", () => {
  const fakeTimers = createFakeTimers();
  let tickCount = 0;
  const ticker = new Ticker({
    tick: () => (tickCount += 1),
    timeoutApi: fakeTimers,
  });

  ticker.play();
  assert.equal(tickCount, 1);

  ticker.stop();

  assert.deepEqual(fakeTimers.clearedIds, [1]);
  assert.equal(fakeTimers.getPendingCount(), 0);
});
