const request = require('supertest');
const express = require('express');
const { expect } = require('chai');
const loaders = require('../src/loaders');
const log = require('../src/utils/logger');
const app = express();

describe('Palindrome check test', () => {
  before(async () => {
    log.pause();
    await loaders.init({ expressApp: app });
  });

  describe('Check if string is palindrome', () => {
    it('should return true when input str is a palindrome', done => {
      request(app)
        .get('/palindrome/check?str=abcdcba')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(true);
          done();
        });
    });

    it('should be able to parse only alpha numeric parts of the string', done => {
      request(app)
        .get('/palindrome/check?str=?ab@cdc@ba?')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(true);
          done();
        });
    });

    it('should return false when input str is not a palindrome', done => {
      request(app)
        .get('/palindrome/check?str=abcdcbax')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(false);
          done();
        });
    });

    it('should return true when input str is a palindrome and case sensitive flag is true', done => {
      request(app)
        .get('/palindrome/check?str=AbcdcbA&caseSensitive=true')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(true);
          done();
        });
    });

    it('should return false when input str is not a palindrome and case sensitive flag is false', done => {
      request(app)
        .get('/palindrome/check?str=Abcdcba&caseSensitive=true')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(false);
          done();
        });
    });

    it('should be able to handle when required string is not provided', done => {
      request(app)
        .get('/palindrome/check')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('code');
          expect(res.body.code).to.be.eq('VALIDATION_ERROR');
          done();
        });
    });

    it('should be able to handle when required string is empty', done => {
      request(app)
        .get('/palindrome/check?str=')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('code');
          expect(res.body.code).to.be.eq('VALIDATION_ERROR');
          done();
        });
    });
  });
});
