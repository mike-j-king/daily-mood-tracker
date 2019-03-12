'user strict';
var sql = require('./db.js');

var Mood = function(mood){
  this.mood = mood.mood;
  this.note = mood.note;
};

Mood.list = function getAllMoods(start_date, end_date, result) {
  sql.query("Select * from mood_entry Where timestamp >= ? And timestamp <= ?", [start_date, end_date], function (err, res) {
    if(err) {
      result(null, err);
    }
    else{
      result(null, res);
    }
  });   
};

Mood.createMood = function createUser(newMood, result) {    
  sql.query("INSERT INTO mood_entry set ?", newMood, function (err, res) {
    if(err) {
      result(err, null);
    }
    else{
      result(null, res.insertId);
    }
  });           
};

module.exports = Mood;