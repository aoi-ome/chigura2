import assert from "node:assert/strict";
import test from "node:test";

import { hexToRgb } from "../../dist/util/converter.js";

test("hexToRgb converts a hex color into RGB values", () => {
  assert.deepEqual(hexToRgb("#12abef"), [0x12, 0xab, 0xef]);
});
