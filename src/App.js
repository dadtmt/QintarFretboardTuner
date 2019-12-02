import React from 'react';
import logo from './logo.svg';
import './App.css';
import {generateFretboard} from './generators'
import Fretboard from './Fretboard';

function App() {
  return (
    <div>
      <Fretboard />
    </div>
  );
}

export default App;
