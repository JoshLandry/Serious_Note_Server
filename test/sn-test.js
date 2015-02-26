'use strict';

process.env.MONGO_URI = 'mongodb://localhost/dbtest';
require('../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect

describe('seriousnote api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
    done();
    });
  });

  it('should respond to a POST request', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/seriousnote/')
      .send({reminderID: 755, textContent: 'Hank Aaron is the true home run king'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.textContent).to.eql('Hank Aaron is the true home run king');
        done();
      });
  });

  it('should GET a specific note', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/seriousnote/' + 755)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.textContent).to.eql('Hank Aaron is the true home run king');
          done();
      });
  });

  it('should DELETE a note', function(done) {
    chai.request('localhost:3000/api/v1')
      .delete('/seriousnote/' + 755)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.eql(undefined);
        done();
      });
  });
});
