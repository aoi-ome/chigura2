import type { ColorCode } from "./resource/colors.js";
import { hexToRgb } from "./util/converter.js";

export function drawPixels({
  imageData,
  pixels,
}: {
  imageData: ImageData;
  pixels: readonly ColorCode[];
}): void {
  for (let i = 0; i < pixels.length; i += 1) {
    const pixel = pixels[i];
    const offset = i * 4;
    if (pixel === null) {
      imageData.data[offset + 0] = 0;
      imageData.data[offset + 1] = 0;
      imageData.data[offset + 2] = 0;
      imageData.data[offset + 3] = 0;
      continue;
    }

    const [r, g, b] = hexToRgb(pixel);
    imageData.data[offset + 0] = r;
    imageData.data[offset + 1] = g;
    imageData.data[offset + 2] = b;
    imageData.data[offset + 3] = 255;
  }
}
