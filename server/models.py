from pydantic import BaseModel, Field


class WorkoutGetRequest(BaseModel):
    date: str


class WorkoutSet(BaseModel):
    weight: int = Field(
        gt=0
    )
    reps: int = Field(
        gt=0
    )
    failed: bool | None = False


class Workout(BaseModel):
    exercise: str
    sets: list[WorkoutSet]


class WorkoutGetResponse(BaseModel):
    workouts: list[Workout]


