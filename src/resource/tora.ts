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
const C = COLORS.C; // moccasin
const G = COLORS.G; // dimGray
const N = COLORS.N; // saddleBrown
const O = COLORS.O; // orange
const o = COLORS.o; // burlywood
const P = COLORS.P; // hotPink
const R = COLORS.R; // Red
const W = COLORS.W; // White

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, O, O, O, B, _, _, B, O, O, O, B, _, _,
  _, _, B, o, G, o, B, B, B, B, o, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, o, C, C, B, C, C, C, C, B, C, C, o, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, C, P, B, C, C, C, C, C, C, B, P, C, B, _,
  B, B, P, B, W, B, C, C, C, C, B, W, B, P, B, B,
  _, B, C, B, W, B, C, C, C, C, B, W, B, C, B, _,
  _, B, O, B, C, o, C, C, C, C, o, C, B, O, B, _,
  B, _, B, o, C, C, o, C, C, o, C, C, o, B, _, _,
  B, _, B, o, o, C, C, o, o, C, C, o, o, B, _, _,
  B, B, B, C, o, C, C, C, C, C, C, o, C, B, _, _,
  _, B, B, C, C, o, o, B, B, o, o, C, C, B, _, _,
  _, _, B, B, W, W, B, _, _, B, W, W, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const FUSE = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, G, C, B, B, B, B, C, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, C, C, C, B, C, C, C, C, B, C, C, C, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, o, P, P, C, C, C, C, C, C, P, P, o, B, _,
  B, B, B, P, P, C, C, C, C, C, C, P, P, B, B, B,
  _, B, O, C, C, C, C, C, C, C, C, C, C, O, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, C, R, R, R, R, C, B, B, _, _, _,
  B, _, B, o, o, C, C, o, o, C, C, o, o, B, _, _,
  _, B, B, C, C, o, o, B, B, o, o, C, C, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, G, C, B, B, B, B, C, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, C, C, C, B, C, C, C, C, B, C, C, C, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, o, P, P, C, C, C, C, C, C, P, P, o, B, _,
  B, B, B, P, P, C, C, C, C, C, C, P, P, B, B, B,
  _, B, O, C, C, C, C, C, C, C, C, C, C, O, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, R, R, R, R, B, B, _, _, _, _,
  B, _, _, B, B, C, C, o, o, C, C, B, B, _, _, _,
  B, B, B, W, W, B, o, C, C, o, B, W, W, B, _, _,
  _, B, B, C, C, B, C, o, o, C, B, C, C, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, G, C, B, B, B, B, C, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, C, C, C, B, C, C, C, C, B, C, C, C, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, o, P, P, C, C, C, C, C, C, P, P, o, B, _,
  B, B, B, P, P, C, C, C, C, C, C, P, P, B, B, B,
  _, B, O, C, C, C, C, C, C, C, C, C, C, O, B, _,
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
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, G, C, B, B, B, B, C, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, C, C, C, B, C, C, C, C, B, C, C, C, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, o, P, P, C, C, C, C, C, C, P, P, o, B, _,
  B, B, B, P, P, C, C, C, C, C, C, P, P, B, B, B,
  _, B, O, C, C, C, C, C, C, C, C, C, C, O, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, C, R, R, R, R, C, B, B, _, _, _,
  B, _, B, B, o, C, o, C, C, o, C, o, B, B, _, _,
  B, B, B, o, C, B, B, o, o, B, B, C, o, B, _, _,
  _, B, B, o, C, W, W, B, B, W, W, C, o, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, G, C, B, B, B, B, C, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, C, C, C, B, C, C, C, C, B, C, C, C, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, o, P, P, C, C, C, C, C, C, P, P, o, B, _,
  B, B, B, P, P, C, C, C, C, C, C, P, P, B, B, B,
  _, B, O, C, C, C, C, C, C, C, C, C, C, O, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, C, R, R, R, R, C, B, B, _, _, _,
  B, _, B, B, o, C, C, o, o, C, C, o, B, B, _, _,
  B, B, B, o, C, C, o, C, C, o, C, C, o, B, _, _,
  _, B, B, o, W, W, B, o, o, B, W, W, o, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, G, C, B, B, B, B, C, G, o, B, _, _,
  _, B, o, o, C, C, C, o, o, C, C, C, o, o, B, _,
  _, B, C, C, C, B, C, C, C, C, B, C, C, C, B, _,
  B, B, B, C, C, B, C, o, o, C, B, C, C, B, B, B,
  _, B, o, P, P, C, C, C, C, C, C, P, P, o, B, _,
  B, B, B, P, P, C, C, C, C, C, B, B, P, B, B, B,
  _, B, O, C, C, C, C, C, C, B, W, W, B, O, B, _,
  _, B, B, B, B, B, B, B, B, B, C, C, B, B, _, _,
  B, _, _, B, B, C, R, R, R, R, C, o, B, B, _, _,
  B, _, B, B, C, C, C, o, o, C, C, C, o, B, _, _,
  B, B, B, o, C, C, o, C, C, o, C, C, o, B, _, _,
  _, B, B, o, W, W, B, o, o, B, W, W, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, O, B, _, _, _, _, B, O, B, _, _, _,
  _, _, B, O, o, O, B, _, _, B, O, o, O, B, _, _,
  _, _, B, o, o, C, B, B, B, B, C, o, o, B, _, _,
  _, B, o, C, C, C, C, o, o, C, C, C, C, o, B, _,
  _, B, o, o, C, C, C, C, C, C, C, C, o, o, B, _,
  B, B, o, C, C, C, o, B, o, o, C, C, C, o, B, B,
  _, B, C, C, C, C, C, C, B, C, C, C, C, C, B, _,
  B, B, o, o, C, C, o, o, B, o, C, C, o, o, B, B,
  _, B, O, o, o, C, C, B, C, C, C, o, o, O, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, o, B, o, o, B, B, _, _, _, _,
  _, _, _, B, B, C, o, B, B, o, C, B, B, _, _, _,
  _, _, B, o, C, C, C, o, o, C, C, C, o, B, _, _,
  _, _, B, o, o, C, C, B, B, C, C, o, o, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES = [
  C, C, C,
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
  B, C,
  C, B,
] as const;

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_RIGHT = [
  C, B,
  B, C,
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
  B, C,
  C, B,
  B, C,
] as const;

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_RIGHT = [
  C, B,
  B, C,
  C, B,
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

export const TORA = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
