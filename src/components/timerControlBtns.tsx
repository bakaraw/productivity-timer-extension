import React from 'react';
import RectDOM from 'react-dom';

type TimerControls = {
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
}

export const TimerControlBtns = (params: TimerControls) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='col-span-2 grid grid-cols-3'>
        <div><button onClick={params.startTimer}>Start</button></div>
        <div><button onClick={params.pauseTimer}>Pause</button></div>
        <div><button onClick={params.stopTimer}>Stop</button></div>
      </div>
    </div>
  );
}
