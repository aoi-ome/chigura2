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
const N = COLORS.N; // saddleBrown
const P = COLORS.P; // hotPink
const R = COLORS.R; // Red
const W = COLORS.W; // White
const Y = COLORS.Y; // Yellow

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, B, W, W, W, W, W, W, B, P, W, B, _,
  B, B, P, B, Y, B, W, W, W, W, B, Y, B, P, B, B,
  _, B, W, B, W, B, W, W, W, W, B, W, B, W, B, _,
  _, B, W, B, W, W, W, Y, Y, W, W, W, B, W, B, _,
  B, _, B, Y, W, W, W, Y, Y, W, W, W, Y, B, _, _,
  B, _, B, W, W, W, W, W, W, W, W, W, W, B, _, _,
  B, B, B, W, W, W, W, W, W, W, W, W, W, B, _, _,
  _, B, B, W, Y, W, W, B, B, W, W, Y, W, B, _, _,
  _, _, B, B, Y, Y, B, _, _, B, Y, Y, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const FUSE = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, P, W, W, W, W, W, W, P, P, W, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, W, W, W, W, W, W, W, W, W, W, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, W, W, R, R, W, W, B, B, _, _, _,
  B, _, B, W, W, W, W, W, W, W, W, W, W, B, _, _,
  _, B, B, Y, Y, W, W, B, B, W, W, Y, Y, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, P, W, W, W, W, W, W, P, P, W, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, W, W, W, W, W, W, W, W, W, W, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, W, R, R, W, B, B, _, _, _, _,
  B, _, _, B, B, W, W, W, W, W, W, B, B, _, _, _,
  B, B, B, Y, Y, B, W, W, W, W, B, Y, Y, B, _, _,
  _, B, B, W, W, B, W, W, W, W, B, W, W, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, P, W, W, W, W, W, W, P, P, W, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, W, W, W, W, W, W, W, W, W, W, Y, B, _,
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
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, P, W, W, W, W, W, W, P, P, W, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, W, W, W, W, W, W, W, W, W, W, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, W, W, R, R, W, W, B, B, _, _, _,
  B, _, B, B, W, W, W, W, W, W, W, W, B, B, _, _,
  B, B, B, W, W, B, B, W, W, B, B, W, W, B, _, _,
  _, B, B, Y, W, W, Y, B, B, Y, W, W, Y, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, P, W, W, W, W, W, W, P, P, W, B, _,
  B, B, B, P, P, W, W, W, W, W, W, P, P, B, B, B,
  _, B, Y, W, W, W, W, W, W, W, W, W, W, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, Y, W, R, R, W, Y, B, B, _, _, _,
  B, _, B, B, W, W, W, W, W, W, W, W, B, B, _, _,
  B, B, B, W, W, W, W, W, W, W, W, W, W, B, _, _,
  _, B, B, W, Y, Y, B, W, W, B, Y, Y, W, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, B, W, W, W, W, B, W, W, W, B, _,
  B, B, B, W, W, B, W, W, W, W, B, W, W, B, B, B,
  _, B, W, P, P, W, W, W, W, W, W, P, P, W, B, _,
  B, B, B, P, P, W, W, W, W, W, B, B, P, B, B, B,
  _, B, Y, W, W, W, W, W, W, B, Y, Y, B, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, W, W, B, B, _, _,
  B, _, _, B, B, W, W, R, R, W, W, W, B, B, _, _,
  B, _, B, B, W, W, W, W, W, W, W, W, W, B, _, _,
  B, B, B, W, W, W, W, W, W, W, W, W, W, B, _, _,
  _, B, B, W, Y, Y, B, W, W, B, Y, Y, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, Y, B, _, _, _, _, B, Y, B, _, _, _,
  _, _, B, Y, Y, Y, B, _, _, B, Y, Y, Y, B, _, _,
  _, _, B, Y, W, W, B, B, B, B, W, W, Y, B, _, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  B, B, W, W, W, W, W, B, W, W, W, W, W, W, B, B,
  _, B, W, W, W, W, W, W, B, W, W, W, W, W, B, _,
  B, B, Y, Y, W, W, W, W, B, W, W, W, Y, Y, B, B,
  _, B, Y, Y, W, W, W, B, W, W, W, W, Y, Y, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, W, B, W, W, B, B, _, _, _, _,
  _, _, _, B, B, W, W, B, B, W, W, B, B, _, _, _,
  _, _, B, Y, Y, W, W, W, W, W, W, Y, Y, B, _, _,
  _, _, B, Y, Y, W, W, B, B, W, W, Y, Y, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES = [
  W, W, W,
  B, B, B,
] as const;

const BLINK_EYES_OVERLAYS = [
  {
    pixels: BLINK_EYES,
    size: { width: 3, height: 2 },
    position: { x: 4, y: 5 },
  },
  {
    pixels: BLINK_EYES,
    size: { width: 3, height: 2 },
    position: { x: 9, y: 5 },
  },
] as const satisfies readonly OverlayLayer[];

const BLINK_EYES_OVERLAYS_FUSE = [
  {
    pixels: BLINK_EYES,
    size: { width: 3, height: 2 },
    position: { x: 4, y: 6 },
  },
  {
    pixels: BLINK_EYES,
    size: { width: 3, height: 2 },
    position: { x: 9, y: 6 },
  },
] as const satisfies readonly OverlayLayer[];

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_LEFT = [
  B, W,
  W, B,
] as const;

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_RIGHT = [
  W, B,
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
  B, W,
  W, B,
  B, W,
] as const;

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_RIGHT = [
  W, B,
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

export const SHIRO = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
