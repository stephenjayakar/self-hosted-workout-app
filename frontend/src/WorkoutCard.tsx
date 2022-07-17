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
  TextField,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  ExerciseSet,
  WorkoutDay,
  WorkoutConvexResponse,
  findExerciseIndex,
} from "./models";

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
  const updateWorkout = useMutation("updateWorkout");
  const [showBulkPaste, setShowBulkPaste] = useState(false);

  return (
    <>
      {workout.exercises.map((e) => (
        <div key={workout.date + e.exercise_name}>
          <h1>{e.exercise_name}</h1>
          <Button
            onClick={() => {
              setShowBulkPaste(!showBulkPaste);
            }}
          >
            Toggle Bulk Paste
          </Button>
          {showBulkPaste ? (
            <BulkPasteComponent
              key={workout.date + e.exercise_name + 'bulk_paste'}
              workout={workout}
              associatedExercise={e.exercise_name}
            />
          ) : (
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
                        <Input
                          onChange={(e) => {
                            const newValue = e.target.value;
                            // TODO: This is sketchy as fuck
                            try {
                              const [weight, reps] = newValue.split("x");
                              if (weight && reps) {
                                s.weight = parseInt(weight);
                                s.reps = parseInt(reps);
                                updateWorkout(workout);
                              }
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                          defaultValue={s.weight + "x" + s.reps}
                        />
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
              <RemoveLastSetButton
                workout={workout}
                associatedExercise={e.exercise_name}
              />
            </TableContainer>
          )}
        </div>
      ))}
    </>
  );
}

function BulkPasteComponent(props: {workout: WorkoutDay, associatedExercise: string }) {
  const [bulkPasteValue, setBulkPasteValue] = useState("");
  // TODO: ugh. stop using the whole document mutation
  const updateWorkout = useMutation("updateWorkout");
  return (
    <>
      <TextField
        multiline
        onChange={(e) => {
          setBulkPasteValue(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          const parsed = parseBulkPaste(bulkPasteValue);
          const exerciseIndex = findExerciseIndex(props.workout, props.associatedExercise);
          props.workout.exercises[exerciseIndex].sets = parsed
          updateWorkout(props.workout);
        }}
      >
        Submit
      </Button>
    </>
  );
}

function parseBulkPaste(value: string): ExerciseSet[] {
  const lines = value.split("\n");
  const parsed = lines.map((l) => {
    const start = l.indexOf("- ");
    const restOf = l.substring(start + 1);
    // TODO: I should abstract the number x number logic and make it more robust
    const [weightStr, repsStr] = restOf.split("x");
    return {
      weight: parseInt(weightStr),
      reps: parseInt(repsStr),
      failed: false,
    };
  });
  return parsed;
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
          if (exerciseName === "") {
            alert("Can't create an empty exercise name");
          } else {
            props.workout.exercises.push({
              exercise_name: exerciseName,
              sets: [],
            });
            setExerciseName("");
            updateWorkout(props.workout);
          }
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
        const index = findExerciseIndex(props.workout, props.associatedExercise);
        const exercise = props.workout.exercises[index];
        exercise.sets.push({
          weight: 0,
          reps: 0,
          failed: false,
        });
        updateWorkout(props.workout);
        }
      }
    >
      Add Set
    </Button>
  );
}

function RemoveLastSetButton(props: {
  workout: WorkoutDay;
  associatedExercise: string;
}) {
  const updateWorkout = useMutation("updateWorkout");

  return (
    <Button
      color="error"
      onClick={() => {
        for (var exercise of props.workout.exercises) {
          if (exercise.exercise_name === props.associatedExercise) {
            exercise.sets.pop();
            updateWorkout(props.workout);
            break;
          }
        }
      }}
    >
      Remove Last Set
    </Button>
  );
}
