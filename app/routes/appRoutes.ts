'use strict';

import { appController } from '../controller/appController';


export = function(app: any) {

  let dailyMoodTracker: appController = new appController()

  app.route('/moods')
    .get(dailyMoodTracker.list_all_moods)
    .post(dailyMoodTracker.create_mood);
   
  app.route('/moods/:moodId')
    .put(dailyMoodTracker.update_mood)
};