import { drawPixels } from "./drawer.js";
import type { OverlayLayer, PosePixels } from "./resource/breeds.js";
import type { Position } from "./types/position.js";
import type { Size } from "./types/size.js";

type CatOptions = {
  onClick: () => void;
};

export class Cat {
  private parent: HTMLElement | null = null;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private flipped = false;

  constructor({ onClick }: CatOptions) {
    this.canvas = this.createCanvas();
    this.canvas.addEventListener("click", onClick);

    this.context = this.canvas.getContext("2d");
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.imageRendering = "pixelated";
    canvas.style.cursor = "pointer";

    return canvas;
  }

  getDisplaySize(): Size {
    return {
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetHeight,
    };
  }

  draw({
    pixels,
    overlays = [],
  }: {
    pixels: PosePixels;
    overlays?: readonly OverlayLayer[];
  }) {
    if (!this.parent || !this.context) {
      return;
    }

    const catSize = this.getDisplaySize();
    this.context.clearRect(0, 0, catSize.width, catSize.height);

    this.drawLayer({
      pixels,
      size: { width: this.canvas.width, height: this.canvas.height },
      position: { x: 0, y: 0 },
    });
    for (const overlay of overlays) {
      this.drawLayer(overlay);
    }
  }

  private drawLayer({ pixels, size, position }: OverlayLayer) {
    if (!this.context) {
      return;
    }

    const imageData = this.context.createImageData(size.width, size.height);
    drawPixels({ imageData: imageData, pixels });
    this.context.putImageData(imageData, position.x, position.y);
  }

  flip() {
    this.flipped = !this.flipped;
    this.canvas.style.transform = this.flipped ? "scaleX(-1)" : "scaleX(1)";
  }

  move({ position }: { position: Position }) {
    this.canvas.style.left = `${position.x}px`;
    this.canvas.style.top = `${position.y}px`;
  }

  mount({
    parent,
    size,
    scale,
  }: {
    parent: HTMLElement;
    size: Size;
    scale: number;
  }) {
    this.canvas.width = size.width;
    this.canvas.height = size.height;
    this.canvas.style.width = `${size.width * scale}px`;
    this.canvas.style.height = `${size.height * scale}px`;

    this.parent = parent;
    parent.appendChild(this.canvas);
  }

  unmount() {
    this.canvas.remove();
  }
}
