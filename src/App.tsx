import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerControllerUI } from './components/timerControllerUI';

function App() {
  return (
    <div className="App" data-testid="app-1">
      <header className="App-header">
        <div ></div>
        <TimerControllerUI />
      </header>
    </div>
  );
}

export default App;
