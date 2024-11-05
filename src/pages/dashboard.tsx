import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../components/tabs';
import { TimerControllerUI } from '../components/timerControllerUI';

export const Dashboard = () => {
  const tabs = [
    { label: 'Timer', content: <TimerControllerUI /> },
    { label: 'Block Sites', content: <div>Settings</div> }
  ];

  return (
    <div style={{ width: '400px', height: '720px' }} className='bg-white text-black'>
      <Tabs tabs={tabs} />
    </div>
  );
}
