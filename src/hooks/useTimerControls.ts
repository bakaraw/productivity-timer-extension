import { Time } from './../types/types';
import { sendMessage, Message, Response } from './../utils/messaging';
import useTimer from './../hooks/useTimer'

function useTimerControls(duration: Time) {

  let { timeLeft, resetTimer } = useTimer();

  const startTimer = async () => {
    const finalDuration = duration.minutes * 60 + duration.seconds;
    const message: Message<{ duration: number }> = {
      type: 'START_TIMER',
      payload: { duration: finalDuration }
    };

    try {
      const response: Response<{ status: string }> = await sendMessage(message);

      if (response.data) {
        console.log('Received reply:', response.data.status);
      } else {
        console.error('Background error:', response.error);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const stopTimer = async () => {
    const message: Message = {
      type: 'STOP_TIMER',
    }

    try {
      const response: Response<{ status: string }> = await sendMessage(message);
      if (response.data) {
        console.log('Received reply:', response.data.status);
        resetTimer();
      } else {
        console.error('Background error:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let minutesLeft: number = 0;
  let secondsLeft: number = 0;

  if (timeLeft !== null) {
    minutesLeft = timeLeft > 0 ? Math.floor(timeLeft / 60) : duration.minutes;
    secondsLeft = timeLeft > 0 ? timeLeft % 60 : duration.seconds;

    if (timeLeft <= 0) {
      resetTimer();
    }

  } else {
    minutesLeft = duration.minutes;
    secondsLeft = duration.seconds;
  }

  const TimerControls = {
    startTimer,
    resetTimer,
    stopTimer,
    timeLeft,
    minutesLeft,
    secondsLeft
  }

  return TimerControls;
}

export default useTimerControls;

