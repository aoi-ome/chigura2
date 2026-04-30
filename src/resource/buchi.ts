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
const G = COLORS.G; // dimGray
const g = COLORS.g; // lightGray
const O = COLORS.O; // Orange
const p = COLORS.p; // lightPink
const R = COLORS.R; // Red
const T = COLORS.T; // Tan
const W = COLORS.W; // White

// biome-ignore format: keep manual pixel layout
const BANZAI = [
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, p, G, B, B, B, B, G, p, G, B, _, _,
  _, B, G, p, p, W, G, G, G, G, W, p, p, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, W, O, B, W, W, W, W, W, W, B, O, W, B, _,
  B, B, O, B, p, B, W, W, W, W, B, p, B, O, B, B,
  _, B, W, B, W, B, W, W, W, W, B, W, B, W, B, _,
  _, B, W, B, W, W, W, W, W, W, W, W, B, W, B, _,
  B, _, B, G, W, W, G, G, G, G, W, W, G, B, _, _,
  B, _, B, G, W, W, W, G, G, W, W, W, G, B, _, _,
  B, B, B, G, G, W, W, W, W, W, W, G, G, B, _, _,
  _, B, B, G, G, G, W, B, B, W, G, G, G, B, _, _,
  _, _, B, B, p, p, B, _, _, B, p, p, B, _, _, _,
  _, _, _, B, B, B, _, _, _, _, B, B, B, _, _, _,
];

// biome-ignore format: keep manual pixel layout
const FUSE  = [
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, p, G, B, _, _, B, G, p, G, B, _, _,
  _, _, B, p, p, G, B, B, B, B, G, p, p, B, _, _,
  _, B, G, G, W, W, G, G, G, G, W, W, G, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, G, O, O, W, W, W, W, W, W, O, O, G, B, _,
  B, B, B, O, O, W, W, W, W, W, W, O, O, B, B, B,
  _, B, G, G, W, W, W, W, W, W, W, W, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, G, W, R, R, W, G, B, B, _, _, _,
  B, _, B, G, W, W, W, W, W, W, W, W, G, B, _, _,
  _, B, B, G, G, p, p, B, B, p, p, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
];

// biome-ignore format: keep manual pixel layout
const HESOTEN = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, p, G, B, _, _, B, G, p, G, B, _, _,
  _, _, B, p, p, G, B, B, B, B, G, p, p, B, _, _,
  _, B, G, G, W, W, G, G, G, G, W, W, G, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, G, O, O, W, W, W, W, W, W, O, O, G, B, _,
  B, B, B, O, O, W, W, W, W, W, W, O, O, B, B, B,
  _, B, G, G, W, W, W, W, W, W, W, W, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, _, B, B, W, R, R, W, B, B, _, _, _, _,
  B, _, _, B, B, G, G, W, W, G, G, B, B, _, _, _,
  B, B, B, W, W, B, G, W, W, G, B, W, W, B, _, _,
  _, B, B, G, G, B, W, W, W, W, B, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
];

// biome-ignore format: keep manual pixel layout
const HOIHOI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, p, G, B, _, _, B, G, p, G, B, _, _,
  _, _, B, p, p, G, B, B, B, B, G, p, p, B, _, _,
  _, B, G, G, W, W, G, G, G, G, W, W, G, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, G, O, O, W, W, W, W, W, W, O, O, G, B, _,
  B, B, B, O, O, W, W, W, W, W, W, O, O, B, B, B,
  _, B, G, G, W, W, W, W, W, W, W, W, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, B, T, T, T, W, T, T, T, T, B, _, _, _,
  B, _, _, B, T, T, T, T, W, T, T, T, B, _, _, _,
  B, _, _, B, T, T, T, W, T, T, T, T, B, _, _, _,
  _, B, B, B, T, T, T, T, W, T, T, T, B, _, _, _,
  _, _, _, B, B, B, B, B, B, B, B, B, B, _, _, _,
];

// biome-ignore format: keep manual pixel layout
const KOBAKO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, p, G, B, _, _, B, G, p, G, B, _, _,
  _, _, B, p, p, G, B, B, B, B, G, p, p, B, _, _,
  _, B, G, G, W, W, G, G, G, G, W, W, G, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, G, O, O, W, W, W, W, W, W, O, O, G, B, _,
  B, B, B, O, O, W, W, W, W, W, W, O, O, B, B, B,
  _, B, G, G, W, W, W, W, W, W, W, W, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, G, W, R, R, W, G, B, B, _, _, _,
  B, _, B, B, W, W, W, W, W, W, W, W, B, B, _, _,
  B, B, B, G, W, B, B, W, W, B, B, W, G, B, _, _,
  _, B, B, G, G, p, p, B, B, p, p, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
];

// biome-ignore format: keep manual pixel layout
const OSUWARI = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, p, G, B, _, _, B, G, p, G, B, _, _,
  _, _, B, p, p, G, B, B, B, B, G, p, p, B, _, _,
  _, B, G, G, W, W, G, G, G, G, W, W, G, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, G, O, O, W, W, W, W, W, W, O, O, G, B, _,
  B, B, B, O, O, W, W, W, W, W, W, O, O, B, B, B,
  _, B, G, G, W, W, W, W, W, W, W, W, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  B, _, _, B, B, G, W, R, R, W, G, B, B, _, _, _,
  B, _, B, B, G, W, W, W, W, W, W, G, B, B, _, _,
  B, B, B, G, G, W, W, W, W, W, W, G, G, B, _, _,
  _, B, B, G, p, p, B, W, W, B, p, p, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
];

// biome-ignore format: keep manual pixel layout
const OTE = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, p, G, B, _, _, B, G, p, G, B, _, _,
  _, _, B, p, p, G, B, B, B, B, G, p, p, B, _, _,
  _, B, G, G, W, W, G, G, G, G, W, W, G, G, B, _,
  _, B, G, W, W, B, W, G, G, W, B, W, W, G, B, _,
  B, B, B, W, W, B, W, g, g, W, B, W, W, B, B, B,
  _, B, G, O, O, W, W, W, W, W, W, O, O, G, B, _,
  B, B, B, O, O, W, W, W, W, W, B, B, O, B, B, B,
  _, B, G, G, W, W, W, W, W, B, p, p, B, G, B, _,
  _, B, B, B, B, B, B, B, B, B, G, G, B, B, _, _,
  B, _, _, B, B, W, W, R, R, W, G, G, B, B, _, _,
  B, _, B, B, G, W, W, W, W, W, W, G, G, B, _, _,
  B, B, B, G, G, W, W, W, W, W, W, G, G, B, _, _,
  _, B, B, G, p, p, B, W, W, B, p, p, B, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, _, _, _,
];

// biome-ignore format: keep manual pixel layout
const USHIRO = [
  _, _, _, _, B, _, _, _, _, _, _, B, _, _, _, _,
  _, _, _, B, G, B, _, _, _, _, B, G, B, _, _, _,
  _, _, B, G, G, G, B, _, _, B, G, G, G, B, _, _,
  _, _, B, G, W, W, B, B, B, B, W, W, G, B, _, _,
  _, B, G, W, W, W, W, G, G, W, W, W, W, G, B, _,
  _, B, W, W, W, W, W, W, W, W, W, W, W, W, B, _,
  B, B, W, W, W, W, G, B, G, G, W, W, W, W, B, B,
  _, B, G, W, W, G, G, G, B, G, G, W, W, G, B, _,
  B, B, G, G, W, W, G, G, B, G, W, W, G, G, B, B,
  _, B, G, G, W, W, W, B, W, W, W, W, G, G, B, _,
  _, B, B, B, B, B, B, B, B, B, B, B, B, B, B, _,
  _, _, _, _, B, B, W, B, W, W, B, B, _, _, _, _,
  _, _, _, B, B, G, W, B, B, W, G, B, B, _, _, _,
  _, _, B, G, G, G, W, W, W, W, G, G, G, B, _, _,
  _, _, B, G, G, W, W, B, B, W, W, G, G, B, _, _,
  _, _, B, B, B, B, B, B, B, B, B, B, B, B, _, _,
];

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
      {
        faces: ANGER_EYES_OVERLAYS_BANZAI,
        effects: ANGRY_EFFECTS,
      },
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
      {
        faces: BLINK_EYES_OVERLAYS,
        effects: BLINK_EFFECTS,
      },
      { faces: ANGER_EYES_OVERLAYS, effects: ANGRY_EFFECTS },
    ],
  },
  {
    pixels: KOBAKO,
    expressions: [
      {
        faces: BLINK_EYES_OVERLAYS,
        effects: BLINK_EFFECTS,
      },
      { faces: ANGER_EYES_OVERLAYS, effects: ANGRY_EFFECTS },
      {
        faces: SQUEEZED_EYES_OVERLAYS,
        effects: SQUEEZED_EFFECTS,
      },
    ],
  },
  {
    pixels: OSUWARI,
    expressions: [
      {
        faces: BLINK_EYES_OVERLAYS,
        effects: BLINK_EFFECTS,
      },
      {
        faces: ANGER_EYES_OVERLAYS,
        effects: ANGRY_EFFECTS,
      },
      {
        faces: SQUEEZED_EYES_OVERLAYS,
        effects: SQUEEZED_EFFECTS,
      },
    ],
  },
  {
    pixels: OTE,
    expressions: [
      {
        faces: SQUEEZED_EYES_OVERLAYS,
        effects: SQUEEZED_EFFECTS,
      },
    ],
  },
  { pixels: USHIRO },
] as const satisfies readonly PoseData[];

export const BUCHI = {
  poses: POSES,
  size: {
    width: 16,
    height: 16,
  },
} as const satisfies BreedData;
