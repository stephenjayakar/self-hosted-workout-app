import { query } from "convex-dev/server";
import { WorkoutConvexResponse } from '../src/models';

export default query(async ({ db }): Promise<[WorkoutConvexResponse]> => {
  const workouts = await db.table("workout_table").collect();
  workouts.sort((a, b) => {
    if (a.date > b.date) {
      return -1
    } else if (a.date < b.date) {
      return 1
    } else {
      return 0
    }
  });
  return workouts as [WorkoutConvexResponse]
});
