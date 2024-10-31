import React from 'react';
import ReactDOM from 'react-dom';
import { Time } from './../types/types';

type TimerTextProps = {
  timeLeft: Time;
  changeMinutes: (isUp: boolean) => void;
  changeSeconds: (isUp: boolean) => void;
}

export const TimerDisplay = (params: TimerTextProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div><button onClick={() => params.changeMinutes(true)}>up</button></div>
      <div><button onClick={() => params.changeSeconds(true)}>up</button></div>
      <div>{params.timeLeft.minutes}</div>
      <div>{params.timeLeft.seconds}</div>
      <div><button onClick={() => params.changeMinutes(false)}>down</button></div>
      <div><button onClick={() => params.changeSeconds(false)}>down</button></div>
    </div>
  );
}
