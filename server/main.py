from fastapi import FastAPI

from server import models

app = FastAPI()


@app.post('/workout/get', response_model=models.WorkoutGetResponse)
async def workout_get(req: models.WorkoutGetRequest):
    date = req.date
    if date != '2022-04-12':
        return {}

    return {'workouts': [
        {
            'exercise': 'Bench',
            'sets': [{
                'weight': 70,
                'reps': 6,
            }, {
                'weight': 80,
                'reps': 4,
            }, {
                'weight': 100,
                'reps': 2,
            }, {
                'weight': 110,
                'reps': 2,
            }, {
                'weight': 110,
                'reps': 1,
                'failed': True
            }, {
                'weight': 95,
                'reps': 3,
            }, {
                'weight': 95,
                'reps': 4,
            }, {
                'weight': 95,
                'reps': 4,
            }, {
                'weight': 95,
                'reps': 4,
            }]
        }
    ]}
