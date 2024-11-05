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
      <NumberInput value={params.timeLeft.minutes} onChange={(value) => params.changeMinutes(value)} min={0} max={300} />
      <NumberInput value={params.timeLeft.seconds} onChange={(value) => params.changeSeconds(value)} min={0} max={60} />
    </div>
  );
}
