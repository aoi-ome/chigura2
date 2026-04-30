import type { Position } from "./types/position.js";
import type { Size } from "./types/size.js";
import { pickRandom } from "./util/math.js";

const MOVE_STEPS = [-4, 4] as const;

export class Locator {
  private position: Position;

  constructor() {
    this.position = { x: 0, y: 0 };
  }

  getPosition(): Position {
    return this.position;
  }

  locate({ size, fieldSize }: { size: Size; fieldSize: Size }): Position {
    this.normalizePosition({ size, fieldSize });

    const dx = pickRandom(MOVE_STEPS);
    const dy = pickRandom(MOVE_STEPS);

    this.setNextPosition({ size, fieldSize, dx: dx, dy: dy });
    return this.getPosition();
  }

  relocate({ size, fieldSize }: { size: Size; fieldSize: Size }): Position {
    this.setRandomPosition({ size, fieldSize });
    return this.getPosition();
  }

  private setRandomPosition({
    size,
    fieldSize,
  }: {
    size: Size;
    fieldSize: Size;
  }) {
    const maxX = Math.max(0, fieldSize.width - size.width);
    const maxY = Math.max(0, fieldSize.height - size.height);
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    this.position = { x, y };
  }

  private normalizePosition({
    size,
    fieldSize,
  }: {
    size: Size;
    fieldSize: Size;
  }) {
    const maxX = Math.max(0, fieldSize.width - size.width);
    const maxY = Math.max(0, fieldSize.height - size.height);

    this.position = {
      x: Math.min(Math.max(this.position.x, 0), maxX),
      y: Math.min(Math.max(this.position.y, 0), maxY),
    };
  }

  private setNextPosition({
    size,
    fieldSize,
    dx,
    dy,
  }: {
    size: Size;
    fieldSize: Size;
    dx: number;
    dy: number;
  }) {
    const nextX = this.position.x + dx;
    const nextY = this.position.y + dy;
    const maxX = fieldSize.width - size.width;
    const maxY = fieldSize.height - size.height;

    this.position = {
      x: nextX >= 0 && nextX <= maxX ? nextX : this.position.x,
      y: nextY >= 0 && nextY <= maxY ? nextY : this.position.y,
    };
  }
}
