import { Id } from 'convex-dev/values';

interface Workout {
  date: string;
  exercises: [Exercise];
}

export interface WorkoutConvexResponse extends Workout {
  _id: Id;
}


interface Exercise {
  exercise_name: string;
  sets: [ExerciseSet];
}

interface ExerciseSet {
  weight: number;
  reps: number;
  failed: boolean;
}
