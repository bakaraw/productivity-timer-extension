export type Time = {
  minutes: number,
  seconds: number,
}

export interface TimerControls {
  startTimer: () => Promise<void>;
  resetTimer: () => void;
  stopTimer: () => Promise<void>;
  timeLeft: number | null;
  minutesLeft: number;
  secondsLeft: number;
  pauseTimer: () => Promise<void>;
  restTimeLeft: number | null;
  resetRestTimer: () => void;
}

