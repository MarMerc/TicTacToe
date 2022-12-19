import {useState} from 'react';
import './App.css';
import Tictactoe from './Tictactoe';

function App() {
  const [turn, setTurno]=useState('X');

  return (
    <div className="App">
      <Tictactoe />
    </div>
  );
}

export default App;
