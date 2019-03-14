'user strict';
import sql = require('./db');

export class Mood {
  mood: string;
  note: string;

  public constructor(mood) { 
    this.mood = mood.mood;
    this.note = mood.note;
  };

  public list(start_date: string, end_date: string, result: Function): void {
    sql.query("Select * from mood_entry Where timestamp >= ? And timestamp <= ?", [start_date, end_date], function (err, res) {
      if(err) {
        result(null, err);
      }
      else{
        result(null, res);
      }
    });   
  };

  public createMood(newMood: Mood, result: Function): void {    
    sql.query("INSERT INTO mood_entry set ?", newMood, function (err: Error, res: any) {
      if(err) {
        result(err, null);
      }
      else{
        result(null, res.insertId);
      }
    });           
  };


  public updateById(id: number, new_note: string, result): void {
    sql.query("UPDATE mood_entry SET note = ? WHERE id = ?", [new_note, id], function (err: Error, res: any) {
      if(err) {
        result(null, err);
      }
      else{   
        result(null, res);
      }
    }); 
  };
};