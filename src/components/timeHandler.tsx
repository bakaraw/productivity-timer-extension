import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { TimerUI } from './../components/timerUI';
import { Time } from './../types/types';

export const Timer = () => {

  const [time, setTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) {
      setTime({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    //const savedEndTime = localStorage.getItem('endTime');
    //let countDownEndTime: number;
    //
    //if (savedEndTime) {
    //  countDownEndTime = JSON.parse(savedEndTime);
    //} else {
    //  const countDownEndTime = new Date().getTime() + time.hours * time.minutes * time.seconds * 1000;
    //  localStorage.setItem('endTime', JSON.stringify(countDownEndTime));
    //}

    const countDownEndTime = new Date().getTime() + (time.hours * 3600000) + (time.minutes * 60000) + (time.seconds * 1000);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownEndTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsRunning(false);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ hours: hours, minutes: minutes, seconds: seconds });
    }

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <TimerUI timer={time} setTimer={setTime} setIsRunning={setIsRunning} />
  );

};
