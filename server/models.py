from pydantic import BaseModel, Field


class WorkoutGetRequest(BaseModel):
    date: str


class ExerciseSet(BaseModel):
    weight: int = Field(
        gt=0
    )
    reps: int = Field(
        gt=0
    )
    failed: bool = False


class Exercise(BaseModel):
    exercise_name: str
    sets: list[ExerciseSet]


# Can possibly include more metadata later for a workout.
class WorkoutGetResponse(BaseModel):
    exercises: list[Exercise]
