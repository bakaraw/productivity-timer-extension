import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Time, TimerControls } from './../types/types';
import { TimerControlBtns } from './timerControlBtns';
import useTimerControls from './../hooks/useTimerControls';

export const TimerControllerUI = () => {
  const [duration, setDuration] = useState<Time>({
    minutes: 0,
    seconds: 0,
  });

  const [restDuration, setRestDuration] = useState<Time>({
    minutes: 0,
    seconds: 0,
  })

  const TimerControls = useTimerControls(duration, restDuration);

  const changeMinutes = (isUp: boolean) => {
    if (TimerControls.timeLeft !== null) {
      return;
    }

    if (isUp) {
      setDuration({ ...duration, minutes: duration.minutes + 1 });
    } else {
      duration.minutes <= 0 ? setDuration({ ...duration, minutes: 0 }) : setDuration({ ...duration, minutes: duration.minutes - 1 });
    }
  }

  const changeSeconds = (isUp: boolean) => {
    if (TimerControls.timeLeft !== null) {
      return;
    }

    if (isUp) {
      duration.seconds >= 60 ? setDuration({ ...duration, seconds: 0 }) : setDuration({ ...duration, seconds: duration.seconds + 1 });
    } else {
      duration.seconds <= 0 ? setDuration({ ...duration, seconds: 60 }) : setDuration({ ...duration, seconds: duration.seconds - 1 });
    }
  }

  return (
    <div className="text-2xl">
      <div className="grid grid-cols-2 gap-2">
        <div><button onClick={() => changeMinutes(true)}>up</button></div>
        <div><button onClick={() => changeSeconds(true)}>up</button></div>
        <div>{TimerControls.minutesLeft}</div>
        <div>{TimerControls.secondsLeft}</div>
        <div><button onClick={() => changeMinutes(false)}>down</button></div>
        <div><button onClick={() => changeSeconds(false)}>down</button></div>
        <TimerControlBtns
          startTimer={TimerControls.startTimer}
          pauseTimer={TimerControls.pauseTimer}
          stopTimer={TimerControls.stopTimer}
        />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <h1 className='col-span-2'>Rest Time</h1>
        <div>{TimerControls.restMinutesLeft}m</div>
        <div>{TimerControls.restSecondsLeft}s</div>
      </div>
    </div>
  );

}
