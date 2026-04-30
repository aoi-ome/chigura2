import assert from "node:assert/strict";
import test from "node:test";

import { drawPixels } from "../dist/drawer.js";

test("drawPixels writes transparent RGBA values for null pixels", () => {
  const imageData = {
    data: new Uint8ClampedArray(8),
  };

  drawPixels({
    imageData,
    pixels: [null, "#ff0000"],
  });

  assert.deepEqual(Array.from(imageData.data), [0, 0, 0, 0, 255, 0, 0, 255]);
});
