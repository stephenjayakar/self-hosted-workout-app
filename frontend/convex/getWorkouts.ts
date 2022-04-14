import { query } from "convex-dev/server";

export default query(async ({ db }): Promise<any> => {
  const workouts = await db.table("workout_table").collect();
  console.log(workouts);
  return workouts
});
