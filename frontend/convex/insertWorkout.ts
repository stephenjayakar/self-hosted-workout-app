import { mutation } from 'convex-dev/server';

export default mutation(async ({ db }, workout: object) => {
    db.insert("workout_table", workout);
});
