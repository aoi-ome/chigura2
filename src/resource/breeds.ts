import type { Position } from "../types/position.js";
import type { Size } from "../types/size.js";
import type { ColorCode } from "./colors.js";

export type PosePixels = readonly ColorCode[];
export type OverlayPixels = readonly ColorCode[];

export type OverlayLayer = {
  readonly pixels: OverlayPixels;
  readonly size: Size;
  readonly position: Position;
};

export type FaceLayers = readonly OverlayLayer[];
export type EffectLayers = readonly OverlayLayer[];
export type EffectChoices = readonly EffectLayers[];
export type Expression = {
  readonly faces: FaceLayers;
  readonly effects?: EffectChoices;
};

export type PoseData = {
  readonly pixels: PosePixels;
  readonly expressions?: readonly Expression[];
};

export type BreedData = {
  readonly poses: readonly PoseData[];
  readonly size: Size;
};

const BREED_LOADERS = {
  buchi: async () => (await import("./buchi.js")).BUCHI,
  hachi: async () => (await import("./hachi.js")).HACHI,
  kuro: async () => (await import("./kuro.js")).KURO,
  mike: async () => (await import("./mike.js")).MIKE,
  saba: async () => (await import("./saba.js")).SABA,
  sabi: async () => (await import("./sabi.js")).SABI,
  shiro: async () => (await import("./shiro.js")).SHIRO,
  tora: async () => (await import("./tora.js")).TORA,
} as const;

export type BreedName = keyof typeof BREED_LOADERS;

export async function loadBreed(name: BreedName): Promise<BreedData> {
  return BREED_LOADERS[name]();
}
