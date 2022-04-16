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

import './models';

export default function App() {
  // const insertWorkout = useMutation("insertWorkout");
  // TODO: Get the Convex Workout response instead
  const workouts: [Workout] = useQuery("getWorkouts") ?? [];
  console.log(workouts);

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
      {showWorkout ? (<WorkoutComponent workout={workout} />) : <div />}
    </Card>
  );
}

/* function WorkoutComponent(props: { workout: Workout }) {
*     const workout = props.workout
*     return (
*         <div>
*             {workout.exercises.map((e: Exercise) => (
*                 <div>
*                     <p>{e.exercise_name}</p>
*                     {e.sets.map((s => (
*                         <p>  {s.weight}x{s.reps} {s.failed ? 'failed' : ''}</p>
*                     )))}
*                 </div>
*             ))}
*         </div>
*     );
 * } */

// TODO: copied from material example
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function WorkoutComponent(props: { workout: Workout }) {
  const workout: Workout = props.workout;
  return workout.exercises.map(e => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{e.exercise_name}</StyledTableCell>
            <StyledTableCell align="right">Weight</StyledTableCell>
            <StyledTableCell align="right">Reps</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {e.sets.map((s) => (
            <StyledTableRow key={s.exercise_name}>
              <StyledTableCell component="th" scope="row">
                {/*e.exercise_name*/}
              </StyledTableCell>
              <StyledTableCell align="right">
                {s.weight}
              </StyledTableCell>
              <StyledTableCell align="right">
                {s.reps}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ));
}
