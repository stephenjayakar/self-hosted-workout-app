import { mutation } from './_generated/server';

export default mutation(async ({ db }, workout: object) => {
    db.insert("workout_table", workout);
});
