import { useState } from 'react';

import { useQuery, useMutation } from "../convex/_generated";

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'

import './models';

export default function App() {
    // const insertWorkout = useMutation("insertWorkout");
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

function WorkoutComponent(props: { workout: Workout }) {
    const workout = props.workout
    return (
        <div>
            {workout.exercises.map((e: Exercise) => (
                <div>
                    <p>{e.exercise_name}</p>
                    {e.sets.map((s => (
                        <p>  {s.weight}x{s.reps} {s.failed ? 'failed' : ''}</p>
                    )))}
                </div>
            ))}
        </div>
    );
}

