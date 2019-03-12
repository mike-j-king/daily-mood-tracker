'use strict';
const moment = require('moment');

var Mood = require('../model/appModel.js');

function valid_date(times){
  var valid = moment(times.start_date, "YYYY-MM-DD", true).isValid() && moment(times.end_date, "YYYY-MM-DD", true).isValid();
  return valid;
}

exports.list_all_moods = function(req, res) {
  if(!req.body.start_date || !req.body.end_date){
    res.status(400).send({ error:true, message: 'Error: Missing Start/End Dates - Please provide a start date and end date in your request body' });
  } else if (!valid_date(req.body)){
    res.status(400).send({ error:true, message: 'Error: Incorrect Date Format - Please provide a start date and end date in your request body in the format yyyy-mm-dd' });
  } else {
    Mood.list(req.body.start_date, req.body.end_date, function(err, mood) {
      if (err)
        res.send(err);
      res.send(mood);
    });
  }
};