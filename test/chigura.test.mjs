import assert from "node:assert/strict";
import test, { afterEach, beforeEach } from "node:test";

import { Chigura } from "../dist/chigura.js";

let originals;

beforeEach(() => {
  originals = {
    document: globalThis.document,
    mathRandom: Math.random,
    requestAnimationFrame: globalThis.requestAnimationFrame,
    cancelAnimationFrame: globalThis.cancelAnimationFrame,
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
  };
});

afterEach(() => {
  globalThis.document = originals.document;
  Math.random = originals.mathRandom;
  globalThis.requestAnimationFrame = originals.requestAnimationFrame;
  globalThis.cancelAnimationFrame = originals.cancelAnimationFrame;
  globalThis.setTimeout = originals.setTimeout;
  globalThis.clearTimeout = originals.clearTimeout;
});

function createFakeStyle(base = {}) {
  return {
    ...base,
    setProperty(name, value) {
      this[name] = value;
    },
  };
}

function createFakeCanvasContext() {
  return {
    clearRectCalls: [],
    createImageDataCalls: [],
    putImageDataCalls: [],
    clearRect(...args) {
      this.clearRectCalls.push(args);
    },
    createImageData(...args) {
      this.createImageDataCalls.push(args);
      return {
        data: new Uint8ClampedArray(args[0] * args[1] * 4),
      };
    },
    putImageData(...args) {
      this.putImageDataCalls.push(args);
    },
  };
}

function createFakeCanvas(context) {
  const canvas = {
    width: 0,
    height: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    removed: false,
    listeners: new Map(),
    addEventListener(type, listener) {
      this.listeners.set(type, listener);
    },
    getContext() {
      return context;
    },
    remove() {
      this.removed = true;
    },
  };

  canvas.style = createFakeStyle();
  Object.defineProperty(canvas.style, "width", {
    get() {
      return this._width;
    },
    set(value) {
      this._width = value;
      canvas.offsetWidth = Number.parseInt(value, 10) || 0;
    },
  });
  Object.defineProperty(canvas.style, "height", {
    get() {
      return this._height;
    },
    set(value) {
      this._height = value;
      canvas.offsetHeight = Number.parseInt(value, 10) || 0;
    },
  });

  return canvas;
}

function createFakeDiv() {
  return {
    style: createFakeStyle(),
    textContent: "",
    removed: false,
    remove() {
      this.removed = true;
    },
  };
}

function createFakeDocument({ canvas, div }) {
  return {
    createElement(tagName) {
      if (tagName === "canvas") {
        return canvas;
      }
      if (tagName === "div") {
        return div;
      }
      throw new Error(`Unsupported tag: ${tagName}`);
    },
  };
}

function createFakeParent() {
  return {
    clientWidth: 120,
    clientHeight: 90,
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
  };
}

function createAnimationFrameMock() {
  let nextId = 1;
  const callbacks = new Map();

  return {
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
      callbacks.delete(id);
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
    getPendingCount() {
      return timers.size;
    },
  };
}

function createRandomMock(values) {
  let index = 0;

  return () => {
    if (index >= values.length) {
      throw new Error("Math.random mock exhausted.");
    }

    const value = values[index];
    index += 1;
    return value;
  };
}

test("Chigura.mount performs the initial draw and schedules animation", async () => {
  const context = createFakeCanvasContext();
  const canvas = createFakeCanvas(context);
  const balloon = createFakeDiv();
  const parent = createFakeParent();
  const animationFrame = createAnimationFrameMock();

  globalThis.document = createFakeDocument({ canvas, div: balloon });
  Math.random = createRandomMock([0.9, 0.9, 0, 0]);
  globalThis.requestAnimationFrame = (callback) =>
    animationFrame.requestAnimationFrame(callback);
  globalThis.cancelAnimationFrame = (id) =>
    animationFrame.cancelAnimationFrame(id);

  const chigura = new Chigura();
  await chigura.mount(parent);

  assert.deepEqual(parent.children, [canvas, balloon]);
  assert.equal(context.clearRectCalls.length, 1);
  assert.equal(context.createImageDataCalls.length, 1);
  assert.ok(canvas.width > 0);
  assert.ok(canvas.height > 0);
  assert.ok(canvas.offsetWidth > 0);
  assert.ok(canvas.offsetHeight > 0);
  assert.equal(canvas.style.left, "0px");
  assert.equal(canvas.style.top, "0px");
  assert.equal(balloon.style.display, "none");
  assert.equal(animationFrame.getPendingCount(), 1);
});

test("Chigura.onClick with runAway moves the cat to a new random position", async () => {
  const context = createFakeCanvasContext();
  const canvas = createFakeCanvas(context);
  const balloon = createFakeDiv();
  const parent = createFakeParent();
  const animationFrame = createAnimationFrameMock();

  globalThis.document = createFakeDocument({ canvas, div: balloon });
  Math.random = createRandomMock([0.9, 0.9, 0, 0, 0, 0.5, 0.25]);
  globalThis.requestAnimationFrame = (callback) =>
    animationFrame.requestAnimationFrame(callback);
  globalThis.cancelAnimationFrame = (id) =>
    animationFrame.cancelAnimationFrame(id);

  const chigura = new Chigura();
  await chigura.mount(parent);

  chigura.onClick();

  const expectedLeft = Math.floor(
    (parent.clientWidth - canvas.offsetWidth) * 0.5,
  );
  const expectedTop = Math.floor(
    (parent.clientHeight - canvas.offsetHeight) * 0.25,
  );

  assert.equal(canvas.style.left, `${expectedLeft}px`);
  assert.equal(canvas.style.top, `${expectedTop}px`);
});

test("Chigura.onClick with meow shows a balloon above the cat", async () => {
  const context = createFakeCanvasContext();
  const canvas = createFakeCanvas(context);
  const balloon = createFakeDiv();
  const parent = createFakeParent();
  const animationFrame = createAnimationFrameMock();
  const timers = createFakeTimers();

  globalThis.document = createFakeDocument({ canvas, div: balloon });
  Math.random = createRandomMock([0.9, 0.9, 0, 0, 0.4, 0]);
  globalThis.requestAnimationFrame = (callback) =>
    animationFrame.requestAnimationFrame(callback);
  globalThis.cancelAnimationFrame = (id) =>
    animationFrame.cancelAnimationFrame(id);
  globalThis.setTimeout = (callback, delay) =>
    timers.setTimeout(callback, delay);
  globalThis.clearTimeout = (id) => timers.clearTimeout(id);

  const chigura = new Chigura();
  await chigura.mount(parent);

  chigura.onClick();

  assert.equal(balloon.textContent, "にゃ");
  assert.equal(balloon.style.display, "block");
  assert.equal(balloon.style.left, `${canvas.offsetWidth / 2}px`);
  assert.equal(balloon.style.top, "0px");
  assert.equal(timers.getPendingCount(), 1);
});

test("Chigura.onClick with play starts the flip ticker", async () => {
  const context = createFakeCanvasContext();
  const canvas = createFakeCanvas(context);
  const balloon = createFakeDiv();
  const parent = createFakeParent();
  const animationFrame = createAnimationFrameMock();
  const timers = createFakeTimers();

  globalThis.document = createFakeDocument({ canvas, div: balloon });
  Math.random = createRandomMock([0.9, 0.9, 0, 0, 0.8]);
  globalThis.requestAnimationFrame = (callback) =>
    animationFrame.requestAnimationFrame(callback);
  globalThis.cancelAnimationFrame = (id) =>
    animationFrame.cancelAnimationFrame(id);
  globalThis.setTimeout = (callback, delay) =>
    timers.setTimeout(callback, delay);
  globalThis.clearTimeout = (id) => timers.clearTimeout(id);

  const chigura = new Chigura();
  await chigura.mount(parent);
  const initialTransform = canvas.style.transform;

  chigura.onClick();

  assert.notEqual(canvas.style.transform, initialTransform);
  assert.equal(timers.getPendingCount(), 1);
});

test("Chigura.onClick runs callback reactions when provided", async () => {
  const context = createFakeCanvasContext();
  const canvas = createFakeCanvas(context);
  const balloon = createFakeDiv();
  const parent = createFakeParent();
  const animationFrame = createAnimationFrameMock();
  let reactionContext = null;

  globalThis.document = createFakeDocument({ canvas, div: balloon });
  Math.random = createRandomMock([0.9, 0.9, 0, 0, 0]);
  globalThis.requestAnimationFrame = (callback) =>
    animationFrame.requestAnimationFrame(callback);
  globalThis.cancelAnimationFrame = (id) =>
    animationFrame.cancelAnimationFrame(id);

  const chigura = new Chigura({
    reactions: [
      (context) => {
        reactionContext = context;
      },
    ],
  });
  await chigura.mount(parent);

  chigura.onClick();

  assert.deepEqual(reactionContext, {
    position: { x: 0, y: 0 },
    size: { width: canvas.offsetWidth, height: canvas.offsetHeight },
  });
  assert.equal(balloon.style.display, "none");
});
