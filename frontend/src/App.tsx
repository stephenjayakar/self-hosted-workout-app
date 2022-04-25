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

import { WorkoutConvexResponse } from "./models";
import WorkoutCard from "./WorkoutCard";

export default function App() {
  // const insertWorkout = useMutation('insertWorkout');
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
