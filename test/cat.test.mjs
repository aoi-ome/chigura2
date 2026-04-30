import assert from "node:assert/strict";
import test from "node:test";

import { Cat } from "../dist/cat.js";

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
  return {
    width: 0,
    height: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    style: {},
    removed: false,
    addEventListener() {},
    getContext() {
      return context;
    },
    remove() {
      this.removed = true;
    },
  };
}

test("Cat.draw clears and redraws the canvas", () => {
  const originalDocument = globalThis.document;
  const context = createFakeCanvasContext();
  const canvas = createFakeCanvas(context);
  const parent = {
    child: null,
    appendChild(child) {
      this.child = child;
    },
  };

  globalThis.document = {
    createElement() {
      return canvas;
    },
  };

  try {
    const cat = new Cat({
      onClick: () => {},
    });
    cat.mount({
      parent,
      size: { width: 16, height: 16 },
      scale: 2,
    });
    canvas.offsetWidth = 32;
    canvas.offsetHeight = 32;

    cat.draw({
      pixels: ["#000000"],
      overlays: [
        {
          pixels: ["#ffffff"],
          size: { width: 1, height: 1 },
          position: { x: 4, y: 5 },
        },
      ],
    });

    assert.equal(parent.child, canvas);
    assert.deepEqual(context.clearRectCalls, [[0, 0, 32, 32]]);
    assert.deepEqual(context.createImageDataCalls, [
      [16, 16],
      [1, 1],
    ]);
    assert.deepEqual(
      context.putImageDataCalls.map((args) => args.slice(1)),
      [
        [0, 0],
        [4, 5],
      ],
    );
  } finally {
    globalThis.document = originalDocument;
  }
});

test("Cat.flip flips the canvas transform", () => {
  const originalDocument = globalThis.document;
  const canvas = createFakeCanvas(createFakeCanvasContext());

  globalThis.document = {
    createElement() {
      return canvas;
    },
  };

  try {
    const cat = new Cat({
      onClick: () => {},
    });

    cat.flip();
    assert.equal(canvas.style.transform, "scaleX(-1)");

    cat.flip();
    assert.equal(canvas.style.transform, "scaleX(1)");
  } finally {
    globalThis.document = originalDocument;
  }
});

test("Cat.move updates the canvas position", () => {
  const originalDocument = globalThis.document;
  const canvas = createFakeCanvas(createFakeCanvasContext());

  globalThis.document = {
    createElement() {
      return canvas;
    },
  };

  try {
    const cat = new Cat({
      onClick: () => {},
    });

    cat.move({
      position: { x: 12, y: 34 },
    });

    assert.equal(canvas.style.left, "12px");
    assert.equal(canvas.style.top, "34px");
  } finally {
    globalThis.document = originalDocument;
  }
});
