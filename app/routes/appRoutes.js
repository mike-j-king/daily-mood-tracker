'use strict';
module.exports = function(app) {
  var dailyMoodTracker = require('../controller/appController');

  app.route('/moods')
    .get(dailyMoodTracker.list_all_moods);
    // .post(dailyMoodTracker.create_mood);
   
  // app.route('/moods/:moodId')
  //   .put(dailyMoodTracker.update_mood)
};