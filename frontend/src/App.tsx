import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { data } from './seed-data';
import { useMutation } from '../convex/_generated';

function App() {
  const insertWorkout = useMutation('insertWorkout');
    function handleClick() {
        // for now insert only one workout
        const workout = data.workouts[0]
        insertWorkout(workout)
        /* data.workouts.map((workout) => {
      *   // Insert it into Convex?
      *   console.log(workout);
      * }); */
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button
          variant="contained"
          onClick={() => handleClick()}
        >Seed Convex Data</Button>
      </header>
    </div>
  );
}

export default App;
