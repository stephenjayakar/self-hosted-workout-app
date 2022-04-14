import { useQuery, useMutation } from "../convex/_generated";
import { data } from './seed-data'

import Button from '@mui/material/Button'

export default function App() {
  const insertWorkout = useMutation("insertWorkout");
  function onClick(workout: object) {
    insertWorkout(workout);
    console.log(workout)
  }

  return (
    <main>
      {data.workouts.map((workout: object) => (
        <p><Button variant="contained" onClick={() => onClick(workout)}>Send {workout.date}</Button></p>
      ))}
    </main>
  );
}
