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
const g = COLORS.g; // lightGray
const O = COLORS.O; // Orange
const p = COLORS.p; // lightPink
const W = COLORS.W; // White
const Y = COLORS.Y; // Yellow

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, p, B, g, g, g, g, g, g, B, p, g, B, _,
  B, B, p, B, Y, B, g, g, g, g, B, Y, B, p, B, B,
  _, B, G, B, g, B, g, g, g, g, B, g, B, G, B, _,
  _, B, g, B, g, g, g, g, g, g, g, g, B, g, B, _,
  B, _, B, g, g, g, g, G, G, g, g, g, g, B, _, _,
  B, _, B, G, G, g, g, g, g, g, g, G, G, B, _, _,
  B, B, B, G, G, g, g, G, G, g, g, G, G, B, _, _,
  _, B, B, g, g, g, G, B, B, G, g, g, g, B, _, _,
  _, _, B, B, Y, Y, B, _, _, B, Y, Y, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const FUSE = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, g, B, _, _, B, g, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, O, O, g, g, g, g, g, g, O, O, g, B, _,
  B, B, B, O, O, g, g, g, g, g, g, O, O, B, B, B,
  _, B, G, G, G, g, g, g, g, g, g, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, g, g, G, G, g, g, B, B, _, _, _,
  B, _, B, g, g, g, g, g, g, g, g, g, g, B, _, _,
  _, B, B, G, G, g, g, B, B, g, g, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, g, B, _, _, B, g, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, O, O, g, g, g, g, g, g, O, O, g, B, _,
  B, B, B, O, O, g, g, g, g, g, g, O, O, B, B, B,
  _, B, G, G, G, g, g, g, g, g, g, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, G, g, g, G, B, B, _, _, _, _,
  B, _, _, B, B, g, g, g, g, g, g, B, B, _, _, _,
  B, B, B, Y, Y, B, g, G, G, g, B, Y, Y, B, _, _,
  _, B, B, G, G, B, g, G, G, g, B, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, g, B, _, _, B, g, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, O, O, g, g, g, g, g, g, O, O, g, B, _,
  B, B, B, O, O, g, g, g, g, g, g, O, O, B, B, B,
  _, B, G, G, G, g, g, g, g, g, g, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, B, E, E, E, W, E, E, E, E, B, _, _, _,
  B, _, _, B, E, E, E, E, W, E, E, E, B, _, _, _,
  B, _, _, B, E, E, E, W, E, E, E, E, B, _, _, _,
  _, B, B, B, E, E, E, E, W, E, E, E, B, _, _, _,
  _, _, _, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const KOBAKO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, g, B, _, _, B, g, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, O, O, g, g, g, g, g, g, O, O, g, B, _,
  B, B, B, O, O, g, g, g, g, g, g, O, O, B, B, B,
  _, B, G, G, G, g, g, g, g, g, g, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, g, g, g, g, g, g, B, B, _, _, _,
  B, _, B, B, g, g, g, G, G, g, g, g, B, B, _, _,
  B, B, B, G, g, B, B, g, g, B, B, g, G, B, _, _,
  _, B, B, G, G, Y, Y, B, B, Y, Y, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, g, B, _, _, B, g, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, O, O, g, g, g, g, g, g, O, O, g, B, _,
  B, B, B, O, O, g, g, g, g, g, g, O, O, B, B, B,
  _, B, G, G, G, g, g, g, g, g, g, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, g, g, g, g, g, g, B, B, _, _, _,
  B, _, B, B, g, g, g, G, G, g, g, g, B, B, _, _,
  B, B, B, G, G, g, g, g, g, g, g, G, G, B, _, _,
  _, B, B, G, Y, Y, B, g, g, B, Y, Y, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, g, B, _, _, B, g, G, G, B, _, _,
  _, _, B, G, Y, g, B, B, B, B, g, Y, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, B, g, G, G, g, B, g, G, G, B, _,
  B, B, B, G, g, B, g, g, g, g, B, g, G, B, B, B,
  _, B, g, O, O, g, g, g, g, g, g, O, O, g, B, _,
  B, B, B, O, O, g, g, g, g, g, B, B, O, B, B, B,
  _, B, G, G, G, g, g, g, g, B, Y, Y, B, G, B, _,
  _, B, B, B, B, B, B, B, B, B, g, g, B, B, _, _,
  B, _, _, B, B, g, g, g, g, g, g, G, B, B, _, _,
  B, _, B, B, g, g, g, G, G, g, g, G, G, B, _, _,
  B, B, B, G, G, g, g, g, g, g, g, G, G, B, _, _,
  _, B, B, G, Y, Y, B, g, g, B, Y, Y, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, g, g, B, B, B, B, g, g, G, B, _, _,
  _, B, g, g, g, g, g, G, G, g, g, g, g, g, B, _,
  _, B, G, G, g, g, g, g, g, g, g, g, G, G, B, _,
  B, B, G, G, g, g, g, B, g, g, g, g, G, G, B, B,
  _, B, g, g, g, g, g, g, B, g, g, g, g, g, B, _,
  B, B, G, G, g, g, g, g, B, g, g, g, G, G, B, B,
  _, B, G, G, G, g, g, B, g, g, g, G, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, g, B, g, g, B, B, _, _, _, _,
  _, _, _, B, B, G, g, B, B, g, G, B, B, _, _, _,
  _, _, B, G, g, g, g, g, g, g, g, g, G, B, _, _,
  _, _, B, G, G, g, g, B, B, g, g, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES = [
  g, g, g,
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
  B, g,
  g, B,
] as const;

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_RIGHT = [
  g, B,
  B, g,
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
  g, B,
  B, g,
] as const;

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_RIGHT = [
  g, B,
  B, g,
  g, B,
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

export const SABA = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
