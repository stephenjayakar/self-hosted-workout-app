import { mutation } from './_generated/server';

export default mutation(async ({ db }, workout: object) => {
  // TODO: make sure the invariants are valid here. maybe have a helper method that is on all workout mutations
  await db.replace(workout._id, workout);
});
