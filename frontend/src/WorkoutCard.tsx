import { useState } from "react";

import { useMutation } from "../convex/_generated/react";

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

import { WorkoutDay, WorkoutConvexResponse } from "./models";

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
        <div className="WorkoutTable">
          <WorkoutTable workout={workout} />
          <h2>Add exercise</h2>
          <AddExerciseForm workout={workout} />
        </div>
      ) : (
        <div />
      )}
    </Card>
  );
}

function WorkoutTable(props: { workout: WorkoutDay }) {
  const workout: WorkoutDay = props.workout;
  return (
    <>
      {workout.exercises.map((e) => (
        <div key={workout.date + e.exercise_name}>
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
            <AddSetButton
              workout={workout}
              associatedExercise={e.exercise_name}
            />
          </TableContainer>
        </div>
      ))}
    </>
  );
}

function AddExerciseForm(props: { workout: WorkoutDay }) {
  const [exerciseName, setExerciseName] = useState("");

  const updateWorkout = useMutation("updateWorkout");

  return (
    <>
      <Input
        onChange={(e: any) => {
          setExerciseName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          props.workout.exercises.push({
            exercise_name: exerciseName,
            sets: [],
          });
          setExerciseName("");
          updateWorkout(props.workout);
        }}
      >
        Add
      </Button>
    </>
  );
}

// TODO: implicitly assumes there is only one exercise_name a workout day. Oops
function AddSetButton(props: {
  workout: WorkoutDay;
  associatedExercise: string;
}) {
  // TODO: do we redefine this? this is cracked
  const updateWorkout = useMutation("updateWorkout");

  return (
    <Button
      onClick={() => {
        // Find the exercise we're modifying
        // TODO: do better Stephen. Either make this a helper
        // on the workout object or make this a specific
        // mutation or honestly I have no idea.

        // We could also preseed which index this is but honestly this is stupid.
        for (var exercise of props.workout.exercises) {
          if (exercise.exercise_name === props.associatedExercise) {
            exercise.sets.push({
              weight: 0,
              reps: 0,
              failed: false,
            });
            updateWorkout(props.workout);
            break;
          }
        }
      }}
    >
      Add Set
    </Button>
  );
}
