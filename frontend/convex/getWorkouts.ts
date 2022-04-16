import { query } from "convex-dev/server";
import { WorkoutConvexResponse } from '../src/models';

export default query(async ({ db }): Promise<[WorkoutConvexResponse]> => {
  const workouts = await db.table("workout_table").collect();
  console.log(workouts);
  return workouts as [WorkoutConvexResponse]
});
