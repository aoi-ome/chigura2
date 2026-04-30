type AnimationFrameApi = Readonly<{
  requestAnimationFrame: typeof globalThis.requestAnimationFrame;
  cancelAnimationFrame: typeof globalThis.cancelAnimationFrame;
}>;

function getDefaultAnimationFrameApi(): AnimationFrameApi {
  return {
    requestAnimationFrame: globalThis.requestAnimationFrame.bind(globalThis),
    cancelAnimationFrame: globalThis.cancelAnimationFrame.bind(globalThis),
  };
}

type AnimatorOptions = {
  callback: () => void;
  frameInterval: number;
  animationFrameApi?: AnimationFrameApi;
};

export class Animator {
  private animationId: number | null = null;
  private frameCount = 0;
  private readonly callback: () => void;
  private readonly frameInterval: number;
  private readonly animationFrameApi: AnimationFrameApi;

  constructor({ callback, frameInterval, animationFrameApi }: AnimatorOptions) {
    this.callback = callback;
    this.frameInterval = frameInterval;
    this.animationFrameApi = animationFrameApi ?? getDefaultAnimationFrameApi();
  }

  start() {
    if (this.animationId !== null) {
      return;
    }

    const loop = () => {
      if (this.frameCount >= this.frameInterval) {
        this.callback();
        this.frameCount = 0;
      }

      this.frameCount += 1;
      this.animationId = this.animationFrameApi.requestAnimationFrame(loop);
    };

    loop();
  }

  stop() {
    if (this.animationId === null) {
      return;
    }

    this.animationFrameApi.cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }
}
