import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Time, TimerControls } from './../types/types';
import { TimerControlBtns } from './timerControlBtns';
import useTimerControls from './../hooks/useTimerControls';
import { MinutesInput } from './minutesInput';
import NumberInput from './numberInput';

export const TimerControllerUI = () => {
  const [duration, setDuration] = useState<Time>({
    minutes: 0,
    seconds: 0,
  });

  const [restDuration, setRestDuration] = useState<Time>({
    minutes: 0,
    seconds: 0,
  })

  const [reps, setReps] = useState<number>(1);

  const TimerControls = useTimerControls(duration, restDuration, reps);

  const changeDurationMinutes = (minutes: number) => {
    setDuration({ ...duration, minutes });
  };

  const changeRestDurationMinutes = (minutes: number) => {
    setRestDuration({ ...restDuration, minutes });
  };

  const changeDurationSeconds = (seconds: number) => {
    setDuration({ ...duration, seconds });
  };

  const changeRestDurationSeconds = (seconds: number) => {
    setRestDuration({ ...restDuration, seconds });
  };

  return (
    <div className="text-2xl flex flex-col h-full">
      <div className="grid grid-cols-2 gap-1">
        <MinutesInput
          timeLeft={{ minutes: TimerControls.minutesLeft, seconds: TimerControls.secondsLeft }}
          changeMinutes={changeDurationMinutes}
          changeSeconds={changeDurationSeconds}
        />

        <MinutesInput
          timeLeft={{ minutes: TimerControls.restMinutesLeft, seconds: TimerControls.restSecondsLeft }}
          changeMinutes={changeRestDurationMinutes}
          changeSeconds={changeRestDurationSeconds}
        />

        <NumberInput value={reps} onChange={(value) => setReps(value)} min={1} max={100} />
      </div>

      <div className="mt-auto">
        <TimerControlBtns
          startTimer={TimerControls.startTimer}
          pauseTimer={TimerControls.pauseTimer}
          stopTimer={TimerControls.stopTimer}
        />
      </div>
    </div>
  );
}
