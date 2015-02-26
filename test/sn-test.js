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

  describe('already has data in database', function() {
    var id;
    beforeEach(function(done) {
      chai.request('localhost:3000/api/v1')
        .post('/seriousnote/')
        .send({reminderID: 666})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    it('should have an index', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/seriousnote/')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body[0]).to.have.property('recipientID');
          done();
        });
    });

    // it('should be able to update', function(done) {
    //   chai.request('localhost:3000/api/v1')
    //     .put('/pets/' + id)
    //     .send({name: 'Demi'})
    //     .end(function(err, res) {
    //       expect(err).to.eql(null);
    //       expect(res.body.name).to.eql('Demi');
    //       done();
    //     });
    // });

    // it('should be able to delete', function(done) {
    //   chai.request('localhost:3000/api/v1')
    //     .delete('/pets/' + id)
    //     .end(function(err, res) {
    //       expect(err).to.eql(null);
    //       expect(res.body._id).to.eql(undefined);
    //       done();
    //     });
    // });
  });
});
