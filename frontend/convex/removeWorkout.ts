import { mutation } from './_generated/server';
import { Id }from 'convex-dev/values';

export default mutation(async ({ db }, workoutID: Id) => {
    db.delete(workoutID);
});
