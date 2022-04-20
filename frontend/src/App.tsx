import { useState } from 'react';

import { useQuery, useMutation } from "../convex/_generated";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Workout,
  WorkoutConvexResponse,
} from './models';

export default function App() {
  // const insertWorkout = useMutation("insertWorkout");
  // TODO: Get the Convex Workout response instead
  const workouts: [WorkoutConvexResponse] = useQuery("getWorkouts") ?? [];

  return (
    <main>
      <p>All your workouts</p>
      {workouts.map(workout => (
        <WorkoutCard key={workout.date} workout={workout} />
      ))}
    </main>
  );
}

function WorkoutCard(props: { key: string, workout: Workout }) {
  const workout = props.workout
  const [showWorkout, setShowWorkout] = useState(false);

  return (
    <Card>
      <Button
        variant="contained"
        onClick={() => { setShowWorkout(!showWorkout) }}
      >
        {(!showWorkout ? 'Show workout ' : 'Hide workout ') + workout.date}
      </Button>
      {showWorkout ? (<WorkoutTable workout={workout} />) : <div />}
    </Card>
  );
}

function WorkoutTable(props: { workout: Workout }) {
  const workout: Workout = props.workout;
  return (
    <div className="WorkoutTable">{workout.exercises.map(e => (
      <>
        <h1>{e.exercise_name}</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Reps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {e.sets.map((s, i) => (
                <TableRow key={e.exercise_name + i}>
                  <TableCell align="right">
                    {s.weight}
                  </TableCell>
                  <TableCell align="right">
                    {s.reps}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    ))}
    </div>
  );
}
