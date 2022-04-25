import { useState } from "react";

import { useQuery, useMutation } from "../convex/_generated";

import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Workout, WorkoutConvexResponse } from "./models";

export default function App() {
  // const insertWorkout = useMutation("insertWorkout");
  // TODO: Get the Convex Workout response instead
  const workouts: [WorkoutConvexResponse] = useQuery("getWorkouts") ?? [];

  return (
    <main>
      <h1>Workouts</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Date"
              variant="outlined"
              placeholder="YYYY-MM-DD"
              type="date"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button>Create workout</Button>
          </Grid>
        </Grid>
      </Box>

      {workouts.map((workout) => (
        <WorkoutCard key={workout.date} workout={workout} />
      ))}
    </main>
  );
}

function WorkoutCard(props: { key: string; workout: Workout }) {
  const workout = props.workout;
  const [showWorkout, setShowWorkout] = useState(false);

  return (
    <Card>
      <Button
        variant="contained"
        onClick={() => {
          setShowWorkout(!showWorkout);
        }}
      >
        {(!showWorkout ? "Show workout " : "Hide workout ") + workout.date}
      </Button>
      {showWorkout ? <WorkoutTable workout={workout} /> : <div />}
    </Card>
  );
}

function WorkoutTable(props: { workout: Workout }) {
  const workout: Workout = props.workout;
  return (
    <div className="WorkoutTable">
      {workout.exercises.map((e) => (
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
                    <TableCell align="right">{s.weight}</TableCell>
                    <TableCell align="right">{s.reps}</TableCell>
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
