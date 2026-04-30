import type { OverlayLayer } from "./breeds.js";
import { COLORS } from "./colors.js";

const _ = COLORS._;
const L = COLORS.L;
const P = COLORS.P;
const R = COLORS.R;
const V = COLORS.V;
const Y = COLORS.Y;

// biome-ignore format: keep manual pixel layout
const ANGER_SIGN = [
  R, _, R,
  _, R, _,
  R, _, R,
] as const;

export const ANGER_SIGN_EFFECT = [
  {
    pixels: ANGER_SIGN,
    size: { width: 3, height: 3 },
    position: { x: 12, y: 1 },
  },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const FIRE = [
  _, R, _,
  R, P, R,
] as const;

export const FIRE_EFFECT = [
  { pixels: FIRE, size: { width: 3, height: 2 }, position: { x: 0, y: 14 } },
  { pixels: FIRE, size: { width: 3, height: 2 }, position: { x: 13, y: 14 } },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const HEART = [
  P, _, P,
  P, P, P,
  _, P, _,
] as const;

export const HEART_LEFT_EFFECT = [
  { pixels: HEART, size: { width: 3, height: 3 }, position: { x: 0, y: 0 } },
] as const satisfies readonly OverlayLayer[];

export const HEART_RIGHT_EFFECT = [
  { pixels: HEART, size: { width: 3, height: 3 }, position: { x: 13, y: 1 } },
] as const satisfies readonly OverlayLayer[];

export const HEART_EFFECT = [
  { pixels: HEART, size: { width: 3, height: 3 }, position: { x: 0, y: 0 } },
  { pixels: HEART, size: { width: 3, height: 3 }, position: { x: 13, y: 1 } },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const SPARK = [
  _, Y, _,
  Y, Y, Y,
  _, Y, _,
] as const;

export const SPARK_LEFT_EFFECT = [
  { pixels: SPARK, size: { width: 3, height: 3 }, position: { x: -1, y: 0 } },
] as const satisfies readonly OverlayLayer[];

export const SPARK_RIGHT_EFFECT = [
  { pixels: SPARK, size: { width: 3, height: 3 }, position: { x: 14, y: 1 } },
] as const satisfies readonly OverlayLayer[];

export const SPARK_EFFECT = [
  { pixels: SPARK, size: { width: 3, height: 3 }, position: { x: -1, y: 0 } },
  { pixels: SPARK, size: { width: 3, height: 3 }, position: { x: 14, y: 1 } },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const TEAR = [
  _, L, L, L, _,
  L, L, L, L, L,
  L, L, _, L, L,
] as const;

export const TEAR_EFFECT = [
  { pixels: TEAR, size: { width: 5, height: 3 }, position: { x: -2, y: 4 } },
  { pixels: TEAR, size: { width: 5, height: 3 }, position: { x: 13, y: 4 } },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const TEAR_POOL = [
  _, L, L, _,
  L, L, L, L,
] as const;

export const TEAR_POOL_EFFECT = [
  {
    pixels: TEAR_POOL,
    size: { width: 4, height: 2 },
    position: { x: -1, y: 14 },
  },
  {
    pixels: TEAR_POOL,
    size: { width: 4, height: 2 },
    position: { x: 13, y: 14 },
  },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const ZZZ = [
  V, V, V,
  _, V, _,
  V, V, V,
] as const;

export const ZZZ_LEFT_EFFECT = [
  { pixels: ZZZ, size: { width: 3, height: 3 }, position: { x: 12, y: 1 } },
] as const satisfies readonly OverlayLayer[];

export const ZZZ_RIGHT_EFFECT = [
  { pixels: ZZZ, size: { width: 3, height: 3 }, position: { x: 13, y: 0 } },
] as const satisfies readonly OverlayLayer[];
