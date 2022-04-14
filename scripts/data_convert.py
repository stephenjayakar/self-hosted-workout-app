# Converting from my proprietary boostcamp export format to JSON


import json


return_dict = {'workouts': []}

file = open('boostcamp_export', 'r')
lines = file.readlines()
file.close()

# TODO: make sure to assert the -1 is the correct date and exercise
for line in lines:
    if '#' in line:
        continue
    # starting a new day
    if 'day' in line:
        date = line.split('day: ')[1].strip()
        return_dict['workouts'].append({
            'date': date,
            'exercises': [],
        })
        # print(return_dict)
        continue
    # starting a new exercise
    if 'exercise' in line:
        exercises = return_dict['workouts'][-1]['exercises']
        exercise_name = line.split('exercise: ')[1].strip()
        exercises.append({
            'exercise_name': exercise_name,
            'sets': []
        })
        # print(return_dict)
    # adding sets to the previous defined exercise
    else:
        # yikes
        exercise = return_dict['workouts'][-1]['exercises'][-1]
        split = line.strip()[2:].split('x')
        if len(split) != 2:
            continue
        weight, reps = split
        exercise['sets'].append({
            'weight': float(weight),
            'reps': int(reps),
        })

print(json.dumps(return_dict))
