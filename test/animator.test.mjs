import assert from "node:assert/strict";
import test from "node:test";

import { Animator } from "../dist/animator.js";

function createAnimationFrameMock() {
  let nextId = 1;
  const callbacks = new Map();
  const cancelledIds = [];

  return {
    cancelledIds,
    getPendingCount() {
      return callbacks.size;
    },
    requestAnimationFrame(callback) {
      const id = nextId;
      nextId += 1;
      callbacks.set(id, callback);
      return id;
    },
    cancelAnimationFrame(id) {
      cancelledIds.push(id);
      callbacks.delete(id);
    },
    step() {
      const entry = callbacks.entries().next().value;
      if (!entry) {
        throw new Error("No animation frame is scheduled.");
      }

      const [id, callback] = entry;
      callbacks.delete(id);
      callback();
    },
  };
}

test("Animator invokes the callback when the frame interval is reached", () => {
  const animationFrame = createAnimationFrameMock();
  let callbackCount = 0;
  const animator = new Animator({
    callback: () => (callbackCount += 1),
    frameInterval: 2,
    animationFrameApi: animationFrame,
  });

  animator.start();
  assert.equal(callbackCount, 0);

  animationFrame.step();
  assert.equal(callbackCount, 0);

  animationFrame.step();
  assert.equal(callbackCount, 1);
});

test("Animator.start does not schedule a second loop while already running", () => {
  const animationFrame = createAnimationFrameMock();
  const animator = new Animator({
    callback: () => {},
    frameInterval: 1,
    animationFrameApi: animationFrame,
  });

  animator.start();
  assert.equal(animationFrame.getPendingCount(), 1);

  animator.start();
  assert.equal(animationFrame.getPendingCount(), 1);
});

test("Animator.stop cancels the scheduled animation frame", () => {
  const animationFrame = createAnimationFrameMock();
  let callbackCount = 0;
  const animator = new Animator({
    callback: () => (callbackCount += 1),
    frameInterval: 1,
    animationFrameApi: animationFrame,
  });

  animator.start();
  assert.equal(animationFrame.getPendingCount(), 1);

  animator.stop();
  assert.equal(animationFrame.getPendingCount(), 0);
  assert.deepEqual(animationFrame.cancelledIds, [1]);
  assert.equal(callbackCount, 0);
});
