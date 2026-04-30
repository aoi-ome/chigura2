export const COLORS = {
  _: null,
  B: "#000000",
  C: "#ffe4b5",
  E: "#cd853f",
  G: "#696969",
  g: "#d3d3d3",
  L: "#87cefa",
  N: "#8b4513",
  O: "#ffa500",
  o: "#deb887",
  P: "#ff69b4",
  p: "#ffb6c1",
  R: "#ff0000",
  T: "#d2b48c",
  U: "#9370db",
  V: "#4169e1",
  W: "#ffffff",
  Y: "#ffd700",
} as const;

export type ColorCode = (typeof COLORS)[keyof typeof COLORS];
