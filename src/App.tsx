import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timer } from './components/timeHandler';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer />
      </header>
    </div>
  );
}

export default App;
