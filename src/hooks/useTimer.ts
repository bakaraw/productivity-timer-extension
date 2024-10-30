import { useState } from 'react';

function useTimer() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [restTimeLeft, setRestTimeLeft] = useState<number | null>(null);
  const [isRestTimeFinished, setIsRestTimeFinished] = useState<boolean>(false);

  const connectToTimer = (portName: string, callback: (timeLeft: number) => void) => {
    const port = chrome.runtime.connect({ name: portName });

    port.onMessage.addListener((message) => {
      if (message.timeLeft !== undefined) {
        callback(message.timeLeft);
      }

      return () => {
        port.disconnect();
      }
    });
  }

  const resetTimer = () => {
    setTimeLeft(null);
  }

  const resetRestTimer = () => {
    setRestTimeLeft(null);
  }

  connectToTimer('timerUpdates', setTimeLeft);
  connectToTimer('restTimerUpdates', setRestTimeLeft);

  return {
    timeLeft,
    resetTimer,
    restTimeLeft,
    resetRestTimer
  };
}

export default useTimer;
