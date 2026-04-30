import type { BreedData, OverlayLayer, PoseData } from "./breeds.js";
import { COLORS } from "./colors.js";
import {
  ANGER_SIGN_EFFECT,
  FIRE_EFFECT,
  HEART_EFFECT,
  HEART_LEFT_EFFECT,
  HEART_RIGHT_EFFECT,
  SPARK_EFFECT,
  SPARK_LEFT_EFFECT,
  SPARK_RIGHT_EFFECT,
  TEAR_EFFECT,
  TEAR_POOL_EFFECT,
  ZZZ_LEFT_EFFECT,
  ZZZ_RIGHT_EFFECT,
} from "./effects.js";

const _ = COLORS._; // null
const B = COLORS.B; // Black
const g = COLORS.g; // lightGray
const N = COLORS.N; // saddleBrown
const P = COLORS.P; // hotPink
const R = COLORS.R; // Red
const U = COLORS.U; // mediumPurple
const W = COLORS.W; // White
const Y = COLORS.Y; // Yellow

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, B, W, W, W, W, W, W, B, P, g, B, _,
  B, B, P, B, W, B, W, W, W, W, B, W, B, P, B, B,
  _, B, g, B, g, B, W, W, W, W, B, g, B, g, B, _,
  _, B, g, B, g, g, W, W, W, W, g, g, B, g, B, _,
  B, _, B, g, g, W, W, g, g, W, W, g, g, B, _, _,
  B, _, B, B, g, g, W, W, W, W, g, g, B, B, _, _,
  B, B, B, g, g, g, g, W, W, g, g, g, g, B, _, _,
  _, B, B, g, g, g, g, B, B, g, g, g, g, B, _, _,
  _, _, B, B, W, W, B, _, _, B, W, W, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const FUSE = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, P, W, W, W, W, W, W, P, P, g, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, g, W, W, W, W, W, W, W, W, g, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, g, g, R, R, g, g, B, B, _, _, _,
  B, _, B, g, g, g, g, W, W, g, g, g, g, B, _, _,
  _, B, B, W, W, g, g, B, B, g, g, W, W, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, P, W, W, W, W, W, W, P, P, g, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, g, W, W, W, W, W, W, W, W, g, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, g, R, R, g, B, B, _, _, _, _,
  B, _, _, B, B, g, g, W, W, g, g, B, B, _, _, _,
  B, B, B, W, W, B, g, W, W, g, B, W, W, B, _, _,
  _, B, B, g, g, B, g, g, g, g, B, g, g, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, P, W, W, W, W, W, W, P, P, g, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, g, W, W, W, W, W, W, W, W, g, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, B, N, N, N, W, N, N, N, N, B, _, _, _,
  B, _, _, B, N, N, N, N, W, N, N, N, B, _, _, _,
  B, _, _, B, N, N, N, W, N, N, N, N, B, _, _, _,
  _, B, B, B, N, N, N, N, W, N, N, N, B, _, _, _,
  _, _, _, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const KOBAKO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, P, W, W, W, W, W, W, P, P, g, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, g, W, W, W, W, W, W, W, W, g, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, g, g, R, R, g, g, B, B, _, _, _,
  B, _, B, B, g, g, g, W, W, g, g, g, B, B, _, _,
  B, B, B, g, g, B, B, g, g, B, B, g, g, B, _, _,
  _, B, B, W, g, g, W, B, B, W, g, g, W, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, P, W, W, W, W, W, W, P, P, g, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, g, W, W, W, W, W, W, W, W, g, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, g, g, R, R, g, g, B, B, _, _, _,
  B, _, B, B, g, g, g, W, W, g, g, g, B, B, _, _,
  B, B, B, g, g, g, g, W, W, g, g, g, g, B, _, _,
  _, B, B, g, W, W, B, g, g, B, W, W, g, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, g, B, B, B, B, g, Y, U, B, _, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  _, B, g, g, g, B, W, W, W, W, B, g, g, g, B, _,
  B, B, B, g, W, B, W, W, W, W, B, W, g, B, B, B,
  _, B, g, P, P, W, W, W, W, W, W, P, P, g, B, _,
  B, B, B, P, P, W, W, W, W, W, B, B, P, B, B, B,
  _, B, Y, g, W, W, W, W, W, B, W, W, B, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, g, g, B, B, _, _,
  B, _, _, B, B, g, g, R, R, g, g, g, B, B, _, _,
  B, _, B, B, g, g, g, W, W, g, g, g, g, B, _, _,
  B, B, B, g, g, g, g, g, g, g, g, g, g, B, _, _,
  _, B, B, g, W, W, B, g, g, B, W, W, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, g, g, B, B, B, B, g, g, U, B, _, _,
  _, B, g, g, g, g, W, W, W, W, g, g, g, g, B, _,
  _, B, g, g, g, g, g, W, W, g, g, g, g, g, B, _,
  B, B, g, g, g, g, g, B, g, g, g, g, g, g, B, B,
  _, B, W, g, g, g, g, g, B, g, g, g, g, W, B, _,
  B, B, W, W, g, g, g, g, B, g, g, g, W, W, B, B,
  _, B, W, W, W, g, g, B, g, g, g, W, W, W, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, g, B, g, g, B, B, _, _, _, _,
  _, _, _, B, B, g, g, B, B, g, g, B, B, _, _, _,
  _, _, B, W, W, g, g, g, g, g, g, W, W, B, _, _,
  _, _, B, W, W, W, g, B, B, g, W, W, W, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES_LEFT = [
  g, g, W,
  B, B, B,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES_RIGHT = [
  W, g, g,
  B, B, B,
] as const;

const BLINK_EYES_OVERLAYS = [
  {
    pixels: BLINK_EYES_LEFT,
    size: { width: 3, height: 2 },
    position: { x: 4, y: 5 },
  },
  {
    pixels: BLINK_EYES_RIGHT,
    size: { width: 3, height: 2 },
    position: { x: 9, y: 5 },
  },
] as const satisfies readonly OverlayLayer[];

const BLINK_EYES_OVERLAYS_FUSE = [
  {
    pixels: BLINK_EYES_LEFT,
    size: { width: 3, height: 2 },
    position: { x: 4, y: 6 },
  },
  {
    pixels: BLINK_EYES_RIGHT,
    size: { width: 3, height: 2 },
    position: { x: 9, y: 6 },
  },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_LEFT = [
  B, g,
  W, B,
] as const;

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_RIGHT = [
  g, B,
  B, W,
] as const;

const ANGER_EYES_OVERLAYS = [
  {
    pixels: ANGER_EYES_LEFT,
    size: { width: 2, height: 2 },
    position: { x: 4, y: 5 },
  },
  {
    pixels: ANGER_EYES_RIGHT,
    size: { width: 2, height: 2 },
    position: { x: 10, y: 5 },
  },
] as const satisfies readonly OverlayLayer[];

const ANGER_EYES_OVERLAYS_BANZAI = [
  {
    pixels: ANGER_EYES_LEFT,
    size: { width: 2, height: 2 },
    position: { x: 4, y: 4 },
  },
  {
    pixels: ANGER_EYES_RIGHT,
    size: { width: 2, height: 2 },
    position: { x: 10, y: 4 },
  },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_LEFT = [
  B, g,
  W, B,
  B, W,
] as const;

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_RIGHT = [
  g, B,
  B, W,
  W, B,
] as const;

const SQUEEZED_EYES_OVERLAYS = [
  {
    pixels: SQUEEZED_EYES_LEFT,
    size: { width: 2, height: 3 },
    position: { x: 4, y: 5 },
  },
  {
    pixels: SQUEEZED_EYES_RIGHT,
    size: { width: 2, height: 3 },
    position: { x: 10, y: 5 },
  },
] as const satisfies readonly OverlayLayer[];

const SQUEEZED_EYES_OVERLAYS_BANZAI = [
  {
    pixels: SQUEEZED_EYES_LEFT,
    size: { width: 2, height: 3 },
    position: { x: 4, y: 4 },
  },
  {
    pixels: SQUEEZED_EYES_RIGHT,
    size: { width: 2, height: 3 },
    position: { x: 10, y: 4 },
  },
] as const satisfies readonly OverlayLayer[];

const BLINK_EFFECTS = [ZZZ_LEFT_EFFECT, ZZZ_RIGHT_EFFECT] as const;

const ANGRY_EFFECTS = [
  ANGER_SIGN_EFFECT,
  FIRE_EFFECT,
  [...ANGER_SIGN_EFFECT, ...FIRE_EFFECT],
] as const;

const SQUEEZED_EFFECTS = [
  HEART_EFFECT,
  HEART_LEFT_EFFECT,
  HEART_RIGHT_EFFECT,
  SPARK_EFFECT,
  SPARK_LEFT_EFFECT,
  SPARK_RIGHT_EFFECT,
  TEAR_EFFECT,
  [...TEAR_EFFECT, ...TEAR_POOL_EFFECT],
] as const;

const POSES = [
  {
    pixels: BANZAI,
    expressions: [
      { faces: ANGER_EYES_OVERLAYS_BANZAI, effects: ANGRY_EFFECTS },
      {
        faces: SQUEEZED_EYES_OVERLAYS_BANZAI,
        effects: SQUEEZED_EFFECTS,
      },
    ],
  },
  {
    pixels: FUSE,
    expressions: [{ faces: BLINK_EYES_OVERLAYS_FUSE, effects: BLINK_EFFECTS }],
  },
  {
    pixels: HESOTEN,
    expressions: [
      { faces: BLINK_EYES_OVERLAYS, effects: BLINK_EFFECTS },
      {
        faces: SQUEEZED_EYES_OVERLAYS,
        effects: SQUEEZED_EFFECTS,
      },
    ],
  },
  {
    pixels: HOIHOI,
    expressions: [
      { faces: BLINK_EYES_OVERLAYS, effects: BLINK_EFFECTS },
      { faces: ANGER_EYES_OVERLAYS, effects: ANGRY_EFFECTS },
    ],
  },
  {
    pixels: KOBAKO,
    expressions: [
      { faces: BLINK_EYES_OVERLAYS, effects: BLINK_EFFECTS },
      { faces: ANGER_EYES_OVERLAYS, effects: ANGRY_EFFECTS },
      { faces: SQUEEZED_EYES_OVERLAYS, effects: SQUEEZED_EFFECTS },
    ],
  },
  {
    pixels: OSUWARI,
    expressions: [
      { faces: BLINK_EYES_OVERLAYS, effects: BLINK_EFFECTS },
      { faces: ANGER_EYES_OVERLAYS, effects: ANGRY_EFFECTS },
      { faces: SQUEEZED_EYES_OVERLAYS, effects: SQUEEZED_EFFECTS },
    ],
  },
  {
    pixels: OTE,
    expressions: [{ faces: SQUEEZED_EYES_OVERLAYS, effects: SQUEEZED_EFFECTS }],
  },
  { pixels: USHIRO },
] as const satisfies readonly PoseData[];

export const HACHI = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
