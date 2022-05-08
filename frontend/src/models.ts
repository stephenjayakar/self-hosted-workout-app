import { Id } from "convex-dev/values";

export interface WorkoutDay {
  date: string;
  exercises: Exercise[];
}

export interface WorkoutConvexResponse extends WorkoutDay {
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

export function NewWorkout(date: string): WorkoutDay {
  // TODO: validate that it's a valid ISODate
  return {
    date,
    exercises: [],
  }
}
