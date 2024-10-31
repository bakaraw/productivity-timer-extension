import React from 'react';
import ReactDOM from 'react-dom';
import { TimerControllerUI } from '../components/timerControllerUI';

export const Dashboard = () => {
  return (
    <div>
      <h1>Timer</h1>
      <TimerControllerUI />
    </div>
  );
}
