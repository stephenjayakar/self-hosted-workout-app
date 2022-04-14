import { mutation } from 'convex-dev/server';

export default mutation(async ({ db }, workout: object) => {
  let workoutDoc = await db.table("workout_table").first();
  if (workoutDoc === null) {
    workoutDoc = {
      workout,
    };
    db.insert("workout_table", workoutDoc);
  }
  // Like console.log but relays log messages from the server to client.
  // console.log(`Value of counter is now ${counterDoc.counter}`);
});
