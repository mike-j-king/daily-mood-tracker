import app from '../../server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

context('GET Request for retreiving List of moods', () => {

  describe('No start date & end date provided in request body', () => {
    it('should return JSON error & message', () => {
      return chai.request(app).get('/moods')
        .then(res => {
          chai.expect(res.body.message).to.eql("Error: Missing Start/End Dates - Please provide a start date and end date in your request body");
          chai.expect(res.body.error).to.eql(true);
        })
    })
  })

  describe('Request body with incorrectly formatted start & end dates', () => {
    let start_date: String = '01-01-2015'
    let end_date: String = '2019/01/01'
    it('should return JSON error & message', () => {
      return chai.request(app).get('/moods').send({start_date: start_date}).send({end_date: end_date})
        .then(res => {
          chai.expect(res.body.message).to.eql('Error: Incorrect Date Format - Please provide a start date and end date in your request body in the format yyyy-mm-dd');
          chai.expect(res.body.error).to.eql(true);
        })
    })
  })
  
  describe('Dates correctly formatted in request body', () => {
    let start_date: String = '2015-01-01'
    let end_date: String = '2020-01-01'
    it('should return JSON of moods', () => {
      return chai.request(app).get('/moods').send({start_date: start_date}).send({end_date: end_date})
        .then(res => {
          chai.expect(res.body.mood.length).to.greaterThan(0);
          chai.expect(res.body.success).to.eql(true);
        })
    })
  })
})

context('POST Request to updated existing mood', () => {
  describe('No mood provided in request body', () => {
    it('should return JSON error & message', () => {
      return chai.request(app).post('/moods')
        .then(res => {
          chai.expect(res.body.message).to.eql("Error: Incorrect mood provided - Please provide a mood which is one of the following: Happy, Sad or Neutral");
          chai.expect(res.body.error).to.eql(true);
        })
    })
  })

  describe('Incorrectly formatted mood provided in request body', () => {
    it('should return JSON error & message', () => {
      return chai.request(app).post('/moods').send({mood: "Frank"})
        .then(res => {
          chai.expect(res.body.message).to.eql("Error: Incorrect mood provided - Please provide a mood which is one of the following: Happy, Sad or Neutral");
          chai.expect(res.body.error).to.eql(true);
        })
    })
  })

  //warning: this unit test is writing to production db
  describe('Correctly formatted request body including note', () => {
    it('should return success in the response body', () => {
      return chai.request(app).post('/moods').send({mood: "Happy"}).send({note: "This is another note"})
        .then(res => {
          chai.expect(res.body.success).to.eql(true);
        })
    })
  })
})

context('PUT Request to create new mood', () => {
  describe('No moodID provided in the request url', () => {
    it('should return error', () => {
      return chai.request(app).put('/moods')
        .then(res => {
          chai.expect(res.status).to.eql(404);
        })
    })
  })

  describe('moodID provided in the request url without note in request body', () => {
    it('should return error & message', () => {
      return chai.request(app).put('/moods/1')
        .then(res => {
          chai.expect(res.body.error).to.eql(true);
          chai.expect(res.body.message).to.eql('Error: please provide a note in the request body');
        })
    })

    describe('moodID provided in the request url without note in request body', () => {
      it('should return success status', () => {
        return chai.request(app).put('/moods/1').send({note: "Updated note!"})
          .then(res => {
            chai.expect(res.body.success).to.eql(true);
          })
      })
    })
  })

})


