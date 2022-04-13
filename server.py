from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return '<p>Hello world</p>'


@app.route('/workout/get', methods=['POST'])
def workout_get():
    req = request.json
    date = req['date']
    if date != "2022-04-12":
        return {}

    return {"workouts": [
        {
            "exercise": "Bench",
            "sets": [{
                "weight": 70,
                "reps": 6,
            }, {
                "weight": 80,
                "reps": 4,
            }, {
                "weight": 100,
                "reps": 2,
            }, {
                "weight": 110,
                "reps": 2,
            }, {
                "weight": 110,
                "reps": 1,
                "failed": True
            }, {
                "weight": 95,
                "reps": 3,
            }, {
                "weight": 95,
                "reps": 4,
            }, {
                "weight": 95,
                "reps": 4,
            }, {
                "weight": 95,
                "reps": 4,
            }]
        }
    ]}
