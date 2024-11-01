import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Time, TimerControls } from './../types/types';
import { TimerControlBtns } from './timerControlBtns';
import useTimerControls from './../hooks/useTimerControls';
import { TimerDisplay } from './timerDisplay';
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

  const changeRestMinutes = (isUp: boolean) => {
    if (TimerControls.restTimeLeft !== null) {
      return;
    }

    if (isUp) {
      setRestDuration({ ...restDuration, minutes: restDuration.minutes + 1 });
    } else {
      restDuration.minutes <= 0 ? setRestDuration({ ...restDuration, minutes: 0 }) : setRestDuration({ ...restDuration, minutes: restDuration.minutes - 1 });
    }
  }

  const changeRestSeconds = (isUp: boolean) => {
    if (TimerControls.restTimeLeft !== null) {
      return;
    }

    if (isUp) {
      restDuration.seconds >= 60 ? setRestDuration({ ...restDuration, seconds: 0 }) : setRestDuration({ ...restDuration, seconds: restDuration.seconds + 1 });
    } else {
      restDuration.seconds <= 0 ? setRestDuration({ ...restDuration, seconds: 60 }) : setRestDuration({ ...restDuration, seconds: restDuration.seconds - 1 });
    }
  }

  const [reps, setReps] = useState<number>(1);

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
    <div className="text-2xl">
      <div className='grid grid-cols-2 gap-2'>

        <TimerDisplay
          timeLeft={{ minutes: TimerControls.minutesLeft, seconds: TimerControls.secondsLeft }}
          changeMinutes={changeDurationMinutes}
          changeSeconds={changeDurationSeconds}
        />

        <TimerDisplay
          timeLeft={{ minutes: TimerControls.restMinutesLeft, seconds: TimerControls.restSecondsLeft }}
          changeMinutes={changeRestDurationMinutes}
          changeSeconds={changeRestDurationSeconds}
        />

        <NumberInput value={reps} onChange={(value) => setReps(value)} min={1} max={100} />
      </div>
      <TimerControlBtns
        startTimer={TimerControls.startTimer}
        pauseTimer={TimerControls.pauseTimer}
        stopTimer={TimerControls.stopTimer}
      />
    </div>
  );
}
