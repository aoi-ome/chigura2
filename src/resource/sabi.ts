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
const E = COLORS.E; // Peru
const G = COLORS.G; // dimGray
const p = COLORS.p; // lightPink
const T = COLORS.T; // Tan
const W = COLORS.W; // White
const Y = COLORS.Y; // Yellow

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, B, E, E, E, E, E, E, B, Y, G, B, _,
  B, B, G, B, Y, B, E, E, E, E, B, Y, B, G, B, B,
  _, B, E, B, E, B, E, E, E, E, B, E, B, E, B, _,
  _, B, E, B, E, E, E, E, E, E, E, E, B, E, B, _,
  B, _, B, E, E, E, E, G, G, E, E, E, E, B, _, _,
  B, _, B, G, E, E, E, G, G, E, E, E, G, B, _, _,
  B, B, B, G, G, E, E, E, E, E, E, G, G, B, _, _,
  _, B, B, G, G, E, G, B, B, G, E, G, G, B, _, _,
  _, _, B, B, Y, Y, B, _, _, B, Y, Y, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const FUSE = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, Y, E, E, E, E, E, E, Y, Y, G, B, _,
  B, B, B, Y, Y, E, E, E, E, E, E, Y, Y, B, B, B,
  _, B, G, G, E, E, E, E, E, E, E, E, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, E, E, G, G, E, E, B, B, _, _, _,
  B, _, B, E, E, E, E, E, E, E, E, E, E, B, _, _,
  _, B, B, G, G, E, E, B, B, E, E, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, Y, E, E, E, E, E, E, Y, Y, G, B, _,
  B, B, B, Y, Y, E, E, E, E, E, E, Y, Y, B, B, B,
  _, B, G, G, E, E, E, E, E, E, E, E, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, E, G, G, E, B, B, _, _, _, _,
  B, _, _, B, B, E, E, G, G, E, E, B, B, _, _, _,
  B, B, B, Y, Y, B, E, E, E, E, B, Y, Y, B, _, _,
  _, B, B, E, E, B, G, E, E, G, B, E, E, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, Y, E, E, E, E, E, E, Y, Y, G, B, _,
  B, B, B, Y, Y, E, E, E, E, E, E, Y, Y, B, B, B,
  _, B, G, G, E, E, E, E, E, E, E, E, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, B, T, T, T, W, T, T, T, T, B, _, _, _,
  B, _, _, B, T, T, T, T, W, T, T, T, B, _, _, _,
  B, _, _, B, T, T, T, W, T, T, T, T, B, _, _, _,
  _, B, B, B, T, T, T, T, W, T, T, T, B, _, _, _,
  _, _, _, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const KOBAKO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, Y, E, E, E, E, E, E, Y, Y, G, B, _,
  B, B, B, Y, Y, E, E, E, E, E, E, Y, Y, B, B, B,
  _, B, G, G, E, E, E, E, E, E, E, E, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, E, E, G, G, E, E, B, B, _, _, _,
  B, _, B, B, E, E, E, E, E, E, E, E, B, B, _, _,
  B, B, B, G, E, B, B, E, E, B, B, E, G, B, _, _,
  _, B, B, G, G, Y, Y, B, B, Y, Y, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, Y, E, E, E, E, E, E, Y, Y, G, B, _,
  B, B, B, Y, Y, E, E, E, E, E, E, Y, Y, B, B, B,
  _, B, G, G, E, E, E, E, E, E, E, E, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, E, E, G, G, E, E, B, B, _, _, _,
  B, _, B, B, E, E, E, G, G, E, E, E, B, B, _, _,
  B, B, B, G, G, E, E, E, E, E, E, G, G, B, _, _,
  _, B, B, G, Y, Y, B, E, E, B, Y, Y, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, E, B, B, B, B, E, p, G, B, _, _,
  _, B, G, E, E, E, G, G, G, G, E, E, E, G, B, _,
  _, B, G, G, E, B, E, G, G, E, B, E, G, G, B, _,
  B, B, B, G, E, B, E, E, E, E, B, E, G, B, B, B,
  _, B, G, Y, Y, E, E, E, E, E, E, Y, Y, G, B, _,
  B, B, B, Y, Y, E, E, E, E, E, B, B, Y, B, B, B,
  _, B, G, G, E, E, E, E, E, B, Y, Y, B, G, B, _,
  _, B, B, B, B, B, B, B, B, B, E, E, B, B, _, _,
  B, _, _, B, B, E, E, G, G, E, E, G, B, B, _, _,
  B, _, B, B, E, E, E, G, G, E, E, G, G, B, _, _,
  B, B, B, G, G, E, E, E, E, E, E, G, G, B, _, _,
  _, B, B, G, Y, Y, B, E, E, B, Y, Y, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, E, E, B, B, B, B, E, E, G, B, _, _,
  _, B, G, G, E, E, E, G, G, E, E, E, G, G, B, _,
  _, B, G, E, E, E, E, E, E, E, E, E, E, G, B, _,
  B, B, E, E, E, E, E, B, E, E, E, E, E, E, B, B,
  _, B, E, E, E, E, E, E, B, E, E, E, E, E, B, _,
  B, B, G, G, E, E, E, E, B, E, E, E, G, G, B, B,
  _, B, G, G, G, E, E, B, E, E, E, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, E, B, E, E, B, B, _, _, _, _,
  _, _, _, B, B, G, E, B, B, E, G, B, B, _, _, _,
  _, _, B, G, E, E, E, E, E, E, E, E, G, B, _, _,
  _, _, B, G, G, E, E, B, B, E, E, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES = [
  E, E, E,
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
  B, E,
  E, B,
] as const;

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_RIGHT = [
  E, B,
  B, E,
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
  B, E,
  E, B,
  B, E,
] as const;

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_RIGHT = [
  E, B,
  B, E,
  E, B,
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

export const SABI = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
