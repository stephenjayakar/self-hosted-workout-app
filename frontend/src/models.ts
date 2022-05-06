import { Id } from "convex-dev/values";

export interface Workout {
  date: string;
  exercises: Exercise[];
}

export interface WorkoutConvexResponse extends Workout {
  _id: Id;
}

export interface Exercise {
  exercise_name: string;
  sets: [ExerciseSet];
}

export interface ExerciseSet {
  weight: number;
  reps: number;
  failed: boolean;
}

export function NewWorkout(date: string): Workout {
  // TODO: validate that it's a valid ISODate
  return {
    date,
    exercises: [],
  }
}
