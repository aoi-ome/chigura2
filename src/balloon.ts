import type { Position } from "./types/position";

const AUTO_HIDE_DELAY_MS = 2000;
const BALLOON_OFFSET_PX = 6;
const TOP_TRANSFORM = `translate(-50%, calc(-100% - ${BALLOON_OFFSET_PX}px))`;
const BOTTOM_TRANSFORM = `translate(-50%, ${BALLOON_OFFSET_PX}px)`;

type BalloonOptions = {
  autoHideDelayMs?: number | null;
};

type ShowOptions = {
  text: string;
  position: Position;
  anchorHeight?: number;
};

export class Balloon {
  private parent: HTMLElement | null = null;
  private balloon: HTMLDivElement;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly autoHideDelayMs: number | null;

  constructor({ autoHideDelayMs = AUTO_HIDE_DELAY_MS }: BalloonOptions = {}) {
    this.autoHideDelayMs = autoHideDelayMs;
    this.balloon = this.createBalloon();
  }

  private createBalloon(): HTMLDivElement {
    const balloon = document.createElement("div");
    balloon.style.position = "absolute";
    balloon.style.display = "none";
    balloon.style.pointerEvents = "none";
    balloon.style.setProperty("--chigura-balloon-padding", "2px 6px");
    balloon.style.setProperty("--chigura-balloon-color", "#5b4a3b");
    balloon.style.setProperty("--chigura-balloon-background", "#fffaf0");
    balloon.style.setProperty("--chigura-balloon-border", "1px solid #d8c3a5");
    balloon.style.setProperty("--chigura-balloon-border-radius", "999px");
    balloon.style.setProperty(
      "--chigura-balloon-box-shadow",
      "0 1px 2px rgb(0 0 0 / 0.12)",
    );
    balloon.style.setProperty("--chigura-balloon-font-size", "12px");
    balloon.style.setProperty("--chigura-balloon-line-height", "1.2");

    balloon.style.padding = "var(--chigura-balloon-padding)";
    balloon.style.color = "var(--chigura-balloon-color)";
    balloon.style.background = "var(--chigura-balloon-background)";
    balloon.style.border = "var(--chigura-balloon-border)";
    balloon.style.borderRadius = "var(--chigura-balloon-border-radius)";
    balloon.style.boxShadow = "var(--chigura-balloon-box-shadow)";
    balloon.style.transform = TOP_TRANSFORM;
    balloon.style.fontSize = "var(--chigura-balloon-font-size)";
    balloon.style.lineHeight = "var(--chigura-balloon-line-height)";
    balloon.style.whiteSpace = "nowrap";

    return balloon;
  }

  show({ text, position, anchorHeight = 0 }: ShowOptions) {
    if (!this.parent) {
      return;
    }

    const shouldPlaceBelow = this.shouldPlaceBelow(position.y);
    this.balloon.textContent = text;
    this.balloon.style.left = `${position.x}px`;
    this.balloon.style.top = `${shouldPlaceBelow ? position.y + anchorHeight : position.y}px`;
    this.balloon.style.display = "block";
    this.balloon.style.transform = shouldPlaceBelow
      ? BOTTOM_TRANSFORM
      : TOP_TRANSFORM;

    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
    }
    if (this.autoHideDelayMs !== null) {
      this.hideTimer = setTimeout(() => this.hide(), this.autoHideDelayMs);
    }
  }

  private shouldPlaceBelow(y: number): boolean {
    const height = this.balloon.offsetHeight;
    return y - height - BALLOON_OFFSET_PX < 0;
  }

  hide() {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    this.balloon.textContent = "";
    this.balloon.style.display = "none";
  }

  mount(parent: HTMLElement) {
    this.parent = parent;
    parent.appendChild(this.balloon);
  }

  unmount() {
    this.hide();
    this.balloon.remove();
  }
}
