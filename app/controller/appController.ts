'use strict';
import moment = require('moment');
import { Mood } from '../model/appModel';
import { Request, Response } from 'express';

function valid_date(times: {[key: string]: string}): boolean{
  let valid: boolean = moment(times.start_date, "YYYY-MM-DD", true).isValid() && moment(times.end_date, "YYYY-MM-DD", true).isValid();
  return valid;
};

export class appController{

  public list_all_moods(req: Request, res: Response) {
    let mood: Mood = new Mood(req.body);
    if(!req.body.start_date || !req.body.end_date){
      res.status(400).send({ error:true, message: 'Error: Missing Start/End Dates - Please provide a start date and end date in your request body' });
    } else if (!valid_date(req.body)){
      res.status(400).send({ error:true, message: 'Error: Incorrect Date Format - Please provide a start date and end date in your request body in the format yyyy-mm-dd' });
    } else {
      mood.list(req.body.start_date, req.body.end_date, function(err: Error, mood: Mood) {
        if (err)
          res.send(err);
        res.send({success: true, mood: mood});
      });
    }
  };
  
  public create_mood(req: Request, res: Response) {
    let new_mood: Mood = new Mood(req.body);
    if(!new_mood.mood ||  !(["Happy", "Sad", "Neutral"].indexOf(new_mood.mood) > -1)){
      res.status(400).send({ error:true, message: 'Error: Incorrect mood provided - Please provide a mood which is one of the following: Happy, Sad or Neutral' });
    }
    else{
      new_mood.createMood(new_mood, function(err: Error) {
        if (err)
          res.send(err);
        res.json({success: true, message: "Daily Mood Successfully Added!"});
      });
    }
  };
  
  public update_mood(req: Request, res: Response): void {
    let mood: Mood = new Mood(req.body);
    if (!mood.note){
      res.status(400).send({ error:true, message: 'Error: please provide a note in the request body' });
    }
    else{
      mood.updateById(req.params.moodId, req.body.note, function(err: Error, mood: Mood) {
        if (err)
          res.send(err);
        res.json({success: true, mood: mood});
      });
    }

  };
}

