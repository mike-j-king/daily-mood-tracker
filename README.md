# daily-mood-tracker
___
## Description
This is a demonstration app built with express.js.

The intention of this app is to allow a user to manage and track their daily moods. The app includes the ability to:
- List all pre-existing mood entries between two specified dates
- Create a new mood with the optional of including an note
- Update the note for an existing mood based on that mood entries ID

___
## Setup & Use
This application can be setup with the following steps:
1. Clone this repo

        git clone https://github.com/mike-j-king/daily-mood-tracker.git   

2. Change directory to the daily-mood-tracker:
    
        cd daily-mood-tracker

3. Install the package

        npm install

4. Run the application
    
        npm start

*Note: The application will automatically connect to a MySQL server hosted by ClearDB on heroku*    
___
## Architecture, Structure and Rationale
### MVC Architecture
This web app was created with the Model View Controller. As the challenge defined no visual requirements, the views component of this app was ommitted. MVC seemed to be the clearest path forward for building a Rest API with express.js as it elegantly splits the connection to the db, the api end-points and the SQL commands to allow for easy to understand code and scalability should additional end points be added.

### MySQL Hosted by ClearDB on Heroku
To ensure a mysql database can be accessed from any installation of the application, the database was setup on heroku via ClearDB

If the mysql server loses connection then the application will reconnect via pooling. This ensures the app will not crash when connections to the database are lost.

### Application Hosted on Heroku
If the user does not wish to pull the git repository and test locally, they can access all api endpoints via the heroku url: https://daily-mood-tracker.herokuapp.com/

### Database structure
The moods_entry table within the database has been configured to increment IDs upon every creation of a new mood and automatically apply a timestamp.

Error handling was put in place to ensure that the mood was either "Happy", "Sad" or "Neutral" as per the requirements

Error handling was put in place to ensure a start_date and end_date is passed in the request body prior to returning a filtered list of moods

Error handling was put in place to ensure a note is passed in the request body prior to updating a note for a particular moodID

### Unit Tests

Unit tests were created for each of the 3 API calls to test all edge cases where a user may miss or incorrectly enter information in the request body.

Unit tests were developed with mocha/chai.

Note: A test db was not set up for the testing of the PUT request to create a new mood, therefore each time the tests are run, a new entry will be created when testing this PUT request.

## API End-Points:
### List moods between start & end date - GET ['/moods']:
request URL: https://daily-mood-tracker.herokuapp.com/moods

Returns a JSON of all mood entries between two dates

*Note: request must include start_date and end_date in the request body with the format YYYY-MM-DD*
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
request URL: https://daily-mood-tracker.herokuapp.com/moods

Creates a new mood to the database where the mood must be "Happy", "Sad" or "Neutral". A note can also be supplied in the request body (optional).

#### Example Requesty Body:
    {"mood": "Happy", "note": "today was a good day"}

#### Example Response:
    {success: true "message": "Daily Mood Successfully Added!"}

___

### Update existing Mood - PUT ['/moods/:moodID']:
request URL: https://daily-mood-tracker.herokuapp.com/moods/:moodID

Method to update the note for a specific mood

#### Example Requesty Body:
    {success: true, "note": "today was another good day"}