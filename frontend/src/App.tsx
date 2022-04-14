import { useState } from 'react';

import { useQuery, useMutation } from "../convex/_generated";

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'

export default function App() {
    // const insertWorkout = useMutation("insertWorkout");
    const workouts = useQuery("getWorkouts") ?? [];

    return (
        <main>
            <p>All your workouts</p>
            {workouts.map((workout: object) => (
                <WorkoutCard key={workout.date} workout={workout} />
            ))}
        </main>
    );
}

function WorkoutCard(props: object) {
    const workout = props.workout
    const [showWorkout, setShowWorkout] = useState(false);

    return (
        <Card>
            {showWorkout ? (<Workout workout={workout} />) : <div/>}
            <Button
                variant="contained"
                onClick={() => { setShowWorkout(!showWorkout) }}
            >
                {(!showWorkout ? 'Show workout ' : 'Hide workout ') + workout.date}
            </Button>
        </Card>
    );
}

function Workout(props: object) {
  const workout = props.workout
  return (
    <div>
      {workout.exercises.map((e: object) => (
        <div>
          <p>{e.exercise_name}</p>
          {e.sets.map((s: object) => (
            <p>  {s.weight}x{s.reps} {s.failed ? 'failed' : ''}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

