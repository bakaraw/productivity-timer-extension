import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Time } from './../types/types';
import { sendMessage, Message, Response } from './../utils/messaging';
import useTimer from './../hooks/useTimer'

type TimerInfo = {
  timer: Time,
  setTimer: (timer: Time) => void,
  setIsRunning: (isRunning: boolean) => void,
}

export const TimerUI = (params: TimerInfo) => {
  const changeHours = (increment: boolean) => {

    let newHour: number;

    if (increment) {
      newHour = params.timer.hours + 1;
    } else {
      newHour = params.timer.hours > 0
        ? params.timer.hours - 1 : 0;
    }

    const newTimer = {
      ...params.timer,
      hours: newHour,
    }
    params.setTimer(newTimer);
  }

  const changeMinutes = (increment: boolean) => {

    let newMinutes: number;

    if (increment) {
      newMinutes = params.timer.minutes < 60
        ? params.timer.minutes + 1
        : 0;

    } else {
      newMinutes = params.timer.minutes > 0
        ? params.timer.minutes - 1 : 60;
    }

    const newTimer = {
      ...params.timer,
      minutes: newMinutes,
    }
    params.setTimer(newTimer);
  }

  const changeSeconds = (increment: boolean) => {
    let newSeconds: number;

    if (increment) {
      newSeconds = params.timer.seconds < 60
        ? params.timer.seconds + 1
        : 0;
    } else {
      newSeconds = params.timer.seconds > 0
        ? params.timer.seconds - 1 : 60;
    }

    const newTimer = {
      ...params.timer,
      seconds: newSeconds,
    }
    params.setTimer(newTimer);
  }

  const startTimer = async () => {
    const duration = params.timer.hours * 3600 + params.timer.minutes * 60 + params.timer.seconds;
    const message: Message<{ duration: number }> = {
      type: 'START_TIMER',
      payload: { duration: duration }
    };

    try {
      const response: Response<{ status: string }> = await sendMessage(message, null);

      if (response.data) {
        console.log('Received reply:', response.data.status);
      } else {
        console.error('Background error:', response.error);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const timeLeft = useTimer();
  const minutesLeft = timeLeft !== null ? Math.floor(timeLeft / 60) : 0;
  const secondsLeft = timeLeft !== null ? timeLeft % 60 : 0;

  return (
    <div className="text-2xl">
      <h1>Timer Oten sa kanding {timeLeft}</h1>
      <h1>Time: {minutesLeft} - {secondsLeft}</h1>
      <div className="grid grid-rows-3 grid-cols-3 gap-3">
        <div><button onClick={() => changeHours(true)}>up</button></div>
        <div><button onClick={() => changeMinutes(true)}>up</button></div>
        <div><button onClick={() => changeSeconds(true)}>up</button></div>
        <div>{params.timer.hours}h</div>
        <div>{params.timer.minutes}m</div>
        <div>{params.timer.seconds}s</div>
        <div><button onClick={() => changeHours(false)}>down</button></div>
        <div><button onClick={() => changeMinutes(false)}>down</button></div>
        <div><button onClick={() => changeSeconds(false)}>down</button></div>
      </div>
      <div className="grid grid-cols-2">
        <div><button onClick={() => startTimer()}>Start</button></div>
        <div><button onClick={() => params.setIsRunning(false)}>Stop</button></div>
      </div>
    </div>
  );

}
