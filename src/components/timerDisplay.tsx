import React from 'react';
import ReactDOM from 'react-dom';
import { Time } from './../types/types';
import NumberInput from './numberInput';

type TimerTextProps = {
  timeLeft: Time;
  changeMinutes: (value: number) => void;
  changeSeconds: (value: number) => void;
}

export const TimerDisplay = (params: TimerTextProps) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      <NumberInput value={params.timeLeft.minutes} onChange={(value) => params.changeMinutes(value)} min={0} max={999} />
      <NumberInput value={params.timeLeft.seconds} onChange={(value) => params.changeSeconds(value)} min={0} max={999} />
    </div>
  );
  //<div className="grid grid-cols-2 gap-2">
  //  <div><button onClick={() => params.changeMinutes(true)}>up</button></div>
  //  <div><button onClick={() => params.changeSeconds(true)}>up</button></div>
  //  <NumberInput value={reps} onChange={(value) => setReps(value)} min={1} max={100} />
  //  <div>{params.timeLeft.minutes}</div>
  //  <div>{params.timeLeft.seconds}</div>
  //  <div><button onClick={() => params.changeMinutes(false)}>down</button></div>
  //  <div><button onClick={() => params.changeSeconds(false)}>down</button></div>
  //</div>
}
