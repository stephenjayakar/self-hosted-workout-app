import { useState } from "react";

import { useMutation } from "../convex/_generated";

import {
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { Workout, WorkoutConvexResponse } from "./models";

// Component states:
// - Toggling showing the workout information
// - Pressing the remove button, but not pressing the confirm button
export default function WorkoutCard(props: {
  key: string;
  workout: WorkoutConvexResponse;
}) {
  const removeWorkout = useMutation("removeWorkout");

  const workout = props.workout;
  const [showWorkout, setShowWorkout] = useState(false);
  const [removeButtonPressed, setRemoveButtonPressed] = useState(false);

  const confirmRemoveWorkout = (e: any) => {
    removeWorkout(workout._id);
  };

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
      {removeButtonPressed ? (
        <Button
          variant="contained"
          color="error"
          onClick={confirmRemoveWorkout}
        >
          Are you sure?
        </Button>
      ) : (
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => setRemoveButtonPressed(true)}
        >
          Remove workout
        </Button>
      )}

      {showWorkout ? (
        <>
          <WorkoutTable workout={workout} />
          <h2>Add workout</h2>
          <AddWorkoutForm />
        </>
      ) : (
        <div />
      )}
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
                  <TableCell align="right">WeightxReps</TableCell>
                  <TableCell align="right">Blank for now</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {e.sets.map((s, i) => (
                  <TableRow key={e.exercise_name + i}>
                    <TableCell align="right">
                      <Input defaultValue={s.weight + "x" + s.reps} />
                    </TableCell>
                    <TableCell align="right">meow</TableCell>
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

// TODO: refactor this to use a form so that we don't have to have component state.
function AddWorkoutForm(props: any) {
  return (
    <>
      <Input />
      <Button>Add</Button>
    </>
  );
}
