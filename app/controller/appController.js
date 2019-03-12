'use strict';

var Mood = require('../model/appModel.js');

exports.list_all_moods = function(req, res) {
  Mood.list(req.body.start_date, req.body.end_date, function(err, mood) {
    if (err)
      res.send(err);
    res.send(mood);
  });
};