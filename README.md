# Summary

I didn't really like using existing workout apps for a couple of reasons:
* Lack of flexibility. I feel like apps heavily bias towards routines, and sometimes I just want to do my own exercises + mix and match things.
* Ads or some type of monetisation strategy. Don't like that
* Weird UX experiences.

# API

## `POST /workout/get`
### Request
```json
{
  "date": "YYYY-MM-DD"
}
```
### Response
```json
{
  workouts: [
    {
      "exercise": "Bench"
      "sets": [
        {
          "weight": uint,
          "reps": uint,
        }
      ]
    }
  }
}
```
