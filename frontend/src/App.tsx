import { useQuery, useMutation } from "../convex/_generated";
import { data } from './seed-data'

import Button from '@mui/material/Button'

export default function App() {
  const insertWorkout = useMutation("insertWorkout");
  function onClick() {
    data.workouts.forEach((workout: object) => {
        console.log(workout);
      insertWorkout(workout);
    })
  }

  return (
    <main>
      <Button variant="contained" onClick={() => onClick()}>Seed data</Button>
    </main>
  );
}
