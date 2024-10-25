import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Time } from './../types/types';
import { sendMessage, Message, Response } from './../utils/messaging';
import useTimer from './../hooks/useTimer'

export const TimerUI = () => {
  let timeLeft = useTimer();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [duration, setDuration] = useState<Time>({
    minutes: 0,
    seconds: 0,
  });

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
        setIsRunning(true);
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
      const response: Response<{ status: string, duration: number }> = await sendMessage(message);

      if (response.data) {
        console.log('Received reply:', response.data.status);
        setIsRunning(false);
        setDuration({ ...duration, minutes: response.data.duration })
        timeLeft = 0;
      } else {
        console.error('Background error:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const changeMinutes = (isUp: boolean) => {
    if (isUp) {
      setDuration({ ...duration, minutes: duration.minutes + 1 });
    } else {
      duration.minutes <= 0 ? setDuration({ ...duration, minutes: 0 }) : setDuration({ ...duration, minutes: duration.minutes - 1 });
    }
  }

  const changeSeconds = (isUp: boolean) => {
    if (isUp) {
      duration.seconds >= 60 ? setDuration({ ...duration, seconds: 0 }) : setDuration({ ...duration, seconds: duration.seconds + 1 });
    } else {
      duration.seconds <= 0 ? setDuration({ ...duration, seconds: 60 }) : setDuration({ ...duration, seconds: duration.seconds - 1 });
    }
  }

  const minutesLeft = timeLeft !== null ? Math.floor(timeLeft / 60) : duration.minutes;
  const secondsLeft = timeLeft !== null ? timeLeft % 60 : duration.seconds;

  return (
    <div className="text-2xl">
      <h1>Timer Oten sa kanding {timeLeft}</h1>
      <h1>Time: {minutesLeft} - {secondsLeft}</h1>
      <div className="grid grid-rows-2 grid-cols-2 gap-2">
        <div><button onClick={() => changeMinutes(true)}>up</button></div>
        <div><button onClick={() => changeSeconds(true)}>up</button></div>
        <div>{minutesLeft}</div>
        <div>{secondsLeft}s</div>
        <div><button onClick={() => changeMinutes(false)}>down</button></div>
        <div><button onClick={() => changeSeconds(false)}>down</button></div>
      </div>
      <div className="grid grid-cols-2">
        <div><button onClick={() => startTimer()}>Start</button></div>
        <div><button onClick={() => stopTimer()}>Stop</button></div>
      </div>
    </div>
  );

}
