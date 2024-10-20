export type TimerCallback = () => void;

class Timer {
  private timerId: ReturnType<typeof setInterval> | null = null;
  private timeLeft: number = 0;
  private interval: number = 1000;
  private onTick: TimerCallback | null = null;
  private onFinish: TimerCallback | null = null;

  constructor(interval: number = 1000) {
    this.interval = interval;
  }

  public setCallbacks(onTick: TimerCallback, onFinish: TimerCallback) {
    this.onTick = onTick;
    this.onFinish = onFinish;
  }

  public start(duration: number) {
    this.timeLeft = duration;
    this.stop();

    this.timerId = setInterval(() => {
      this.timeLeft -= this.interval / 1000;
      if (this.onTick) this.onTick();

      if (this.timeLeft <= 0) {
        this.stop();
        if (this.onFinish) this.onFinish();
      }

    }, this.interval)
  }

  public stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getTimeLeft(): number {
    return this.timeLeft;
  }

  public isActive(): boolean {
    return this.timerId !== null;
  }

}

export default Timer;
