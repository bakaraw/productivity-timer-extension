import { useState } from 'react';

function useTimer() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const connectToTimer = () => {
    const port = chrome.runtime.connect({ name: 'timerUpdates' });

    port.onMessage.addListener((message) => {
      if (message.timeLeft !== undefined) {
        setTimeLeft(message.timeLeft);
      }
    });

    return () => {
      port.disconnect();
    }

  }

  const resetTimer = () => {
    setTimeLeft(null);
  }

  connectToTimer();
  return { timeLeft, resetTimer };
}

export default useTimer;
