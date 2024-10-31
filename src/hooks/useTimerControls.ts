import { Time, TimerControls } from './../types/types';
import { sendMessage, Message, Response } from './../utils/messaging';
import useTimer from './../hooks/useTimer'
import { useState } from 'react';


function useTimerControls(duration: Time, restDuration: Time): TimerControls {

  let { timeLeft, resetTimer, restTimeLeft, resetRestTimer } = useTimer();
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const startTimer = async () => {
    const finalDuration = duration.minutes * 60 + duration.seconds;
    const finalRestDuration = restDuration.minutes * 60 + restDuration.seconds;
    let message: Message<{ duration: number, restDuration: number }> | null = null;

    if (isPaused) {
      message = {
        type: 'START_TIMER',
        payload: { duration: timeLeft !== null ? timeLeft : finalDuration, restDuration: finalRestDuration }
      };
      setIsPaused(false);
    } else {
      message = {
        type: 'START_TIMER',
        payload: { duration: finalDuration, restDuration: finalRestDuration }
      };
    }

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

  const pauseTimer = async () => {
    const message: Message = {
      type: 'STOP_TIMER',
    }

    try {
      const response: Response<{ status: string }> = await sendMessage(message);
      if (response.data) {
        console.log('Received reply:', response.data.status);
        setIsPaused(true);
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
    minutesLeft = timeLeft >= 0 ? Math.floor(timeLeft / 60) : duration.minutes;
    secondsLeft = timeLeft >= 0 ? timeLeft % 60 : duration.seconds;

    if (timeLeft < 0) {
      resetTimer();
      //startRestTimer();
    }

  } else {
    minutesLeft = duration.minutes;
    secondsLeft = duration.seconds;
  }

  let restMinutesLeft: number = 0;
  let restSecondsLeft: number = 0;

  if (restTimeLeft !== null) {
    restMinutesLeft = restTimeLeft >= 0 ? Math.floor(restTimeLeft / 60) : restDuration.minutes;
    restSecondsLeft = restTimeLeft >= 0 ? restTimeLeft % 60 : restDuration.seconds;
  } else {
    restMinutesLeft = restDuration.minutes;
    restSecondsLeft = restDuration.seconds;
  }

  const TimerControls = {
    startTimer,
    resetTimer,
    stopTimer,
    timeLeft,
    minutesLeft,
    secondsLeft,
    pauseTimer,
    restTimeLeft,
    resetRestTimer,
    restMinutesLeft,
    restSecondsLeft
  }

  return TimerControls;
}

export default useTimerControls;


