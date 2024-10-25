import { useState } from 'react';

function useTimer(): number | null {
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
  connectToTimer();
  return timeLeft;
}

export default useTimer;
