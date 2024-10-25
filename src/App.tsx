import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerUI } from './components/timerUI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimerUI />
      </header>
    </div>
  );
}

export default App;
