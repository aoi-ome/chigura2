type TimeoutApi = Readonly<{
  setTimeout: typeof globalThis.setTimeout;
  clearTimeout: typeof globalThis.clearTimeout;
}>;

function getDefaultTimeoutApi(): TimeoutApi {
  return {
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
  };
}

const DEFAULT_TICK_COUNT = 8;
const DEFAULT_TICK_INTERVAL_MS = 120;

type TickerOptions = {
  tick: () => void;
  tickCount?: number;
  tickIntervalMs?: number;
  timeoutApi?: TimeoutApi;
};

export class Ticker {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private readonly tick: () => void;
  private readonly tickCount: number;
  private readonly tickIntervalMs: number;
  private readonly timeoutApi: TimeoutApi;

  constructor({
    tick,
    tickCount = DEFAULT_TICK_COUNT,
    tickIntervalMs = DEFAULT_TICK_INTERVAL_MS,
    timeoutApi,
  }: TickerOptions) {
    this.tick = tick;
    this.tickCount = tickCount;
    this.tickIntervalMs = tickIntervalMs;
    this.timeoutApi = timeoutApi ?? getDefaultTimeoutApi();
  }

  play() {
    this.stop();

    let remainingFlips = this.tickCount;
    const wiggle = () => {
      this.tick();
      remainingFlips -= 1;

      if (remainingFlips <= 0) {
        this.timer = null;
        return;
      }

      this.timer = this.timeoutApi.setTimeout(wiggle, this.tickIntervalMs);
    };

    wiggle();
  }

  stop() {
    if (this.timer === null) {
      return;
    }

    this.timeoutApi.clearTimeout(this.timer);
    this.timer = null;
  }
}
