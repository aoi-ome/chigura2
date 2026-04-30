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
const R = COLORS.R; // Red
const U = COLORS.U; // mediumPurple
const W = COLORS.W; // White
const Y = COLORS.Y; // Yellow

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, B, G, G, G, G, G, G, B, p, G, B, _,
  B, B, G, B, Y, B, G, G, G, G, B, Y, B, G, B, B,
  _, B, G, B, G, B, G, G, G, G, B, G, B, G, B, _,
  _, B, G, B, G, G, G, G, G, G, G, G, B, G, B, _,
  B, _, B, G, G, G, G, U, U, G, G, G, G, B, _, _,
  B, _, B, B, G, G, G, U, U, G, G, G, B, B, _, _,
  B, B, B, G, G, G, G, G, G, G, G, G, G, B, _, _,
  _, B, B, U, G, G, G, B, B, G, G, G, U, B, _, _,
  _, _, B, B, U, G, B, _, _, B, G, U, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const FUSE = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, p, G, G, G, G, G, G, p, p, G, B, _,
  B, B, B, p, p, G, G, G, G, G, G, p, p, B, B, B,
  _, B, U, G, G, G, G, G, G, G, G, G, G, U, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, G, G, R, R, G, G, B, B, _, _, _,
  B, _, B, G, G, G, G, G, G, G, G, G, G, B, _, _,
  _, B, B, U, U, G, G, B, B, G, G, U, U, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, p, G, G, G, G, G, G, p, p, G, B, _,
  B, B, B, p, p, G, G, G, G, G, G, p, p, B, B, B,
  _, B, U, G, G, G, G, G, G, G, G, G, G, U, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, G, R, R, G, B, B, _, _, _, _,
  B, _, _, B, B, G, G, G, G, G, G, B, B, _, _, _,
  B, B, B, Y, Y, B, G, G, G, G, B, Y, Y, B, _, _,
  _, B, B, G, G, B, G, G, G, G, B, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, p, G, G, G, G, G, G, p, p, G, B, _,
  B, B, B, p, p, G, G, G, G, G, G, p, p, B, B, B,
  _, B, U, G, G, G, G, G, G, G, G, G, G, U, B, _,
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
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, p, G, G, G, G, G, G, p, p, G, B, _,
  B, B, B, p, p, G, G, G, G, G, G, p, p, B, B, B,
  _, B, U, G, G, G, G, G, G, G, G, G, G, U, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, G, G, R, R, G, G, B, B, _, _, _,
  B, _, B, B, G, G, G, G, G, G, G, G, B, B, _, _,
  B, B, B, G, G, B, B, G, G, B, B, G, G, B, _, _,
  _, B, B, U, G, G, Y, B, B, Y, G, G, U, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, p, G, G, G, G, G, G, p, p, G, B, _,
  B, B, B, p, p, G, G, G, G, G, G, p, p, B, B, B,
  _, B, U, G, G, G, G, G, G, G, G, G, G, U, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, U, G, R, R, G, U, B, B, _, _, _,
  B, _, B, B, G, G, G, G, G, G, G, G, B, B, _, _,
  B, B, B, G, G, G, G, G, G, G, G, G, G, B, _, _,
  _, B, B, G, U, U, B, G, G, B, U, U, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, Y, G, B, B, B, B, G, Y, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, B, G, G, G, G, B, G, G, G, B, _,
  B, B, B, G, G, B, G, G, G, G, B, G, G, B, B, B,
  _, B, G, p, p, G, G, G, G, G, G, p, p, G, B, _,
  B, B, B, p, p, G, G, G, G, G, B, B, p, B, B, B,
  _, B, U, G, G, G, G, G, G, B, Y, Y, B, U, B, _,
  _, B, B, B, B, B, B, B, B, B, G, G, B, B, _, _,
  B, _, _, B, B, G, G, R, R, G, G, G, B, B, _, _,
  B, _, B, B, G, G, G, G, G, G, G, G, G, B, _, _,
  B, B, B, G, G, G, G, G, G, G, G, G, G, B, _, _,
  _, B, B, G, U, U, B, G, G, B, U, U, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, U, B, _, _, _, _, B, U, B, _, _, _,
  _, _, B, U, U, U, B, _, _, B, U, U, U, B, _, _,
  _, _, B, U, G, G, B, B, B, B, G, G, U, B, _, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  _, B, G, G, G, G, G, G, G, G, G, G, G, G, B, _,
  B, B, G, G, G, G, G, B, G, G, G, G, G, G, B, B,
  _, B, G, G, G, G, G, G, B, G, G, G, G, G, B, _,
  B, B, U, U, G, G, G, G, B, G, G, G, U, U, B, B,
  _, B, U, U, G, G, G, B, G, G, G, G, U, U, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, G, B, G, G, B, B, _, _, _, _,
  _, _, _, B, B, G, G, B, B, G, G, B, B, _, _, _,
  _, _, B, U, U, G, G, G, G, G, G, U, U, B, _, _,
  _, _, B, U, U, G, G, B, B, G, G, U, U, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
] as const;

// biome-ignore format: keep manual pixel layout
const BLINK_EYES = [
  G, G, G,
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
  B, G,
  G, B,
] as const;

// biome-ignore format: keep manual pixel layout
const ANGER_EYES_RIGHT = [
  G, B,
  B, G,
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
  B, G,
  G, B,
  B, G,
] as const;

// biome-ignore format: keep manual pixel layout
const SQUEEZED_EYES_RIGHT = [
  G, B,
  B, G,
  G, B,
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

export const KURO = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
