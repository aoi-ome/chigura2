import assert from "node:assert/strict";
import test from "node:test";

import { Chigura } from "../dist/index.js";

test("package entrypoint exports Chigura", () => {
  assert.equal(typeof Chigura, "function");
});
