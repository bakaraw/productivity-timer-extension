import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerControllerUI } from './components/timerControllerUI';
import { Dashboard } from './pages/dashboard';

function App() {
  return (
    <div className="App" data-testid="app-1">
      <header className="App-header">
        <div ></div>
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
