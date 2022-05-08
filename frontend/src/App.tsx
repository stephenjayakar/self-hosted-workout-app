import { useQuery, useMutation } from "../convex/_generated";

import { useState } from "react";

import { Box, Button, Grid, TextField } from "@mui/material";

import * as models from "./models";
import WorkoutCard from "./WorkoutCard";

export default function App() {
  const insertWorkout = useMutation("insertWorkout");

  const [newWorkoutDate, setNewWorkoutDate] = useState("");
  const workouts: models.WorkoutConvexResponse[] =
    useQuery("getWorkouts") ?? [];

  const handleDateChange = (event: any) => {
    event.preventDefault();
    const isoDate = event.target.value;
    // TODO: validate
    setNewWorkoutDate(isoDate);
  };

  const handleCreateNewWorkout = (e: any) => {
    e.preventDefault();
    insertWorkout(models.NewWorkout(newWorkoutDate));
    setNewWorkoutDate("");
  };

  return (
    <main>
      <h1>Workouts</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="YYYY-MM-DD"
              type="date"
              onChange={handleDateChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleCreateNewWorkout}>Create workout</Button>
          </Grid>
        </Grid>
      </Box>

      {workouts.map((workout) => (
        <WorkoutCard key={workout.date} workout={workout} />
      ))}
    </main>
  );
}
