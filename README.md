# daily-mood-tracker

## API End-Points:
### List moods between start & end date - GET ['/moods']:
Returns a JSON of all mood entries between two dates

*Note: request must include a start_date and end_date in the format YYYY-MM-DD*
#### Example Requesty Body:
    {"start_date": "2016-01-01", "end_date": "2020-01-01"}

#### Example Response:
    [
      {
          "id": 1,
          "timestamp": "2019-03-11T15:33:07.000Z",
          "mood": "Happy",
          "note": "today im happy"
      },
      {
          "id": 2,
          "timestamp": "2019-03-11T15:33:07.000Z",
          "mood": "Sad",
          "note": "this day i am sad"
      }
    ]

___
    
### Create New Mood - POST ['/moods']:
Creates a new mood to the database where the mood must be "Happy", "Sad" or "Neutral". A note can also be supplied in the request body (optional).

#### Example Requesty Body:
    {"mood": "Happy", "note": "today was a good day"}

#### Example Response:
    {"message": "Daily Mood Successfully Added!"}

___

### Update existing Mood - PUT ['/moods/:moodID']:
Method to update the note for a specific mood

#### Example Requesty Body:
    {"note": "today was another good day"}