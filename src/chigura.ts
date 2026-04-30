import { Animator } from "./animator.js";
import { Balloon } from "./balloon.js";
import { Cat } from "./cat.js";
import { Locator } from "./locator.js";
import type {
  BreedData,
  BreedName,
  Expression,
  EffectLayers,
} from "./resource/breeds.js";
import { loadBreed } from "./resource/breeds.js";
import { Ticker } from "./ticker.js";
import type { Position } from "./types/position.js";
import type { Size } from "./types/size.js";
import { occursWithProbability, pickRandom } from "./util/math.js";

const Scale = {
  s: 1,
  m: 2,
  l: 3,
  xl: 4,
} as const;

export type ScaleName = keyof typeof Scale;

const Speed = {
  slow: 0.05,
  normal: 0.1,
  fast: 0.2,
  faster: 0.4,
} as const;

export type SpeedName = keyof typeof Speed;

const DEFAULT_REACTIONS = ["runAway", "meow", "play"] as const;

export type ReactionName = (typeof DEFAULT_REACTIONS)[number];
export type ReactionContext = {
  position: Position;
  size: Size;
};
export type ReactionCallback = (context: ReactionContext) => void;
type Reaction = ReactionName | ReactionCallback;

const DEFAULT_BALLOON_TEXTS = [
  "にゃ",
  "にゃー",
  "にゃーん",
  "にゃにゃにゃ！？",
  "にゃむにゃむ",
  "みゃ",
  "みゃおん",
  "ごろごろ",
  "ふしゃー！",
  "・・・",
] as const;

export type ChiguraOptions = {
  breed?: BreedName;
  scale?: ScaleName;
  speed?: SpeedName;
  reactions?: readonly Reaction[];
  balloonTexts?: readonly string[];
};

const EXPRESSION_PROBABILITY = 0.5;
const EFFECT_PROBABILITY = 0.5;

export class Chigura {
  private parent: HTMLElement | null = null;
  private breed: BreedName;
  private breedData: BreedData | null = null;
  private scale: ScaleName;
  private speed: SpeedName;
  private reactions: readonly Reaction[];
  private balloonTexts: readonly string[];

  private animator: Animator;
  private locator: Locator;

  private cat: Cat;
  private balloon: Balloon;
  private playTicker: Ticker;

  constructor(options: ChiguraOptions = {}) {
    this.breed = options.breed ?? "buchi";
    this.scale = options.scale ?? "m";
    this.speed = options.speed ?? "normal";
    this.reactions = options.reactions?.length
      ? options.reactions
      : DEFAULT_REACTIONS;
    this.balloonTexts = options.balloonTexts?.length
      ? options.balloonTexts
      : DEFAULT_BALLOON_TEXTS;

    this.animator = new Animator({
      callback: () => this.tick(),
      frameInterval: 15,
    });
    this.locator = new Locator();

    this.cat = new Cat({
      onClick: () => this.onClick(),
    });
    this.balloon = new Balloon();
    this.playTicker = new Ticker({
      tick: () => this.cat.flip(),
    });
  }

  private getFieldSize(): Size | null {
    if (!this.parent) {
      return null;
    }

    return {
      width: this.parent.clientWidth,
      height: this.parent.clientHeight,
    };
  }

  private tick() {
    if (!this.parent) {
      return;
    }
    if (!occursWithProbability(Speed[this.speed])) {
      return;
    }

    this.draw();

    const catSize = this.cat.getDisplaySize();
    const fieldSize = this.getFieldSize();
    if (!fieldSize) {
      return;
    }

    const position = this.locator.locate({
      size: catSize,
      fieldSize: fieldSize,
    });
    this.cat.move({ position: position });
  }

  private draw() {
    if (!this.breedData) {
      return;
    }

    const shouldFlip = occursWithProbability(0.5);
    if (shouldFlip) {
      this.cat.flip();
    }

    const pose = pickRandom(this.breedData.poses);
    const expression = this.pickExpression(pose.expressions);
    const effects = this.pickEffects(expression);

    this.cat.draw({
      pixels: pose.pixels,
      overlays: [...(expression?.faces ?? []), ...effects],
    });
  }

  private pickExpression(
    expressions: readonly Expression[] | undefined,
  ): Expression | null {
    if (
      !expressions?.length ||
      !occursWithProbability(EXPRESSION_PROBABILITY)
    ) {
      return null;
    }

    return pickRandom(expressions);
  }

  private pickEffects(expression: Expression | null): EffectLayers {
    if (
      !expression?.effects?.length ||
      !occursWithProbability(EFFECT_PROBABILITY)
    ) {
      return [];
    }

    return pickRandom(expression.effects);
  }

  onClick() {
    const reaction = pickRandom(this.reactions);

    if (typeof reaction === "function") {
      reaction({
        position: this.locator.getPosition(),
        size: this.cat.getDisplaySize(),
      });
      return;
    }

    switch (reaction) {
      case "runAway":
        this.runAway();
        break;
      case "meow":
        this.meow();
        break;
      case "play":
        this.playTicker.play();
        break;
    }
  }

  private runAway() {
    const catSize = this.cat.getDisplaySize();
    const fieldSize = this.getFieldSize();
    if (!fieldSize) {
      return;
    }

    const position = this.locator.relocate({
      size: catSize,
      fieldSize: fieldSize,
    });
    this.cat.move({ position: position });
  }

  private meow() {
    const position = this.locator.getPosition();
    const catSize = this.cat.getDisplaySize();

    const ballonPosition = {
      x: position.x + catSize.width / 2,
      y: position.y,
    };

    this.balloon.show({
      text: pickRandom(this.balloonTexts),
      position: ballonPosition,
      anchorHeight: catSize.height,
    });
  }

  /** Mount the widget into a container and start animation. */
  async mount(parent: HTMLElement) {
    this.parent = parent;
    this.breedData = await loadBreed(this.breed);

    this.cat.mount({
      parent: parent,
      size: this.breedData.size,
      scale: Scale[this.scale],
    });
    this.balloon.mount(parent);

    this.draw();

    const catSize = this.cat.getDisplaySize();
    const fieldSize = this.getFieldSize();
    if (!fieldSize) {
      return;
    }

    const position = this.locator.relocate({
      size: catSize,
      fieldSize: fieldSize,
    });
    this.cat.move({ position: position });

    this.animator.start();
  }

  /** Stop animation and remove DOM nodes created by this instance. */
  unmount() {
    this.playTicker.stop();
    this.animator.stop();
    this.cat.unmount();
    this.balloon.unmount();
  }
}
