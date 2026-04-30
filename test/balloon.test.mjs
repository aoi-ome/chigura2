import assert from "node:assert/strict";
import test from "node:test";

import { Balloon } from "../dist/balloon.js";

function createFakeStyle() {
  return {
    setProperty(name, value) {
      this[name] = value;
    },
  };
}

function createFakeElement() {
  return {
    style: createFakeStyle(),
    textContent: "",
    offsetHeight: 16,
    removed: false,
    remove() {
      this.removed = true;
    },
  };
}

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

test("Balloon.show and hide toggle the balloon visibility", () => {
  const originalDocument = globalThis.document;
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const fakeElement = createFakeElement();
  const fakeTimers = createFakeTimers();
  const parent = {
    child: null,
    appendChild(child) {
      this.child = child;
    },
  };

  globalThis.document = {
    createElement() {
      return fakeElement;
    },
  };
  globalThis.setTimeout = (callback, delay) =>
    fakeTimers.setTimeout(callback, delay);
  globalThis.clearTimeout = (id) => fakeTimers.clearTimeout(id);

  try {
    const balloon = new Balloon();
    balloon.mount(parent);
    balloon.show({
      text: "にゃ",
      position: { x: 12, y: 34 },
    });
    assert.equal(fakeElement.textContent, "にゃ");
    assert.equal(fakeElement.style.display, "block");
    assert.equal(parent.child, fakeElement);
    assert.equal(fakeElement.style.left, "12px");
    assert.equal(fakeElement.style.top, "34px");
    assert.equal(
      fakeElement.style.transform,
      "translate(-50%, calc(-100% - 6px))",
    );

    balloon.hide();
    assert.equal(fakeElement.textContent, "");
    assert.equal(fakeElement.style.display, "none");
    assert.deepEqual(fakeTimers.clearedIds, [1]);
  } finally {
    globalThis.document = originalDocument;
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
});

test("Balloon auto-hide callback hides the element", () => {
  const originalDocument = globalThis.document;
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const fakeElement = createFakeElement();
  const fakeTimers = createFakeTimers();
  const parent = {
    appendChild() {},
  };

  globalThis.document = {
    createElement() {
      return fakeElement;
    },
  };
  globalThis.setTimeout = (callback, delay) =>
    fakeTimers.setTimeout(callback, delay);
  globalThis.clearTimeout = (id) => fakeTimers.clearTimeout(id);

  try {
    const balloon = new Balloon({ autoHideDelayMs: 500 });
    balloon.mount(parent);
    balloon.show({
      text: "にゃ",
      position: { x: 0, y: 0 },
    });

    fakeTimers.run(1);

    assert.equal(fakeElement.textContent, "");
    assert.equal(fakeElement.style.display, "none");
    assert.deepEqual(fakeTimers.clearedIds, [1]);
  } finally {
    globalThis.document = originalDocument;
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
});
