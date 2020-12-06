const request = require('supertest');
const express = require('express');
const { expect } = require('chai');
const loaders = require('../src/loaders');
const log = require('../src/utils/logger');
const app = express();

describe('Find the minimum cuts palindrome test', () => {
  before(async () => {
    log.pause();
    await loaders.init({ expressApp: app });
  });

  describe('Find the min number of cuts so each substring is a palindrome', () => {
    it('should return the minimum number of cuts', done => {
      request(app)
        .post('/palindrome/minimum-cuts')
        .send({ str: 'noonabbad' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(2);
          done();
        });
    });

    it('should be able to parse only alpha numeric parts of the string', done => {
      request(app)
        .post('/palindrome/minimum-cuts')
        .send({ str: 'xaba@@ay' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(3);
          done();
        });
    });

    it('should return the minimum number of cuts when case sensitive flag is true', done => {
      request(app)
        .post('/palindrome/minimum-cuts?caseSensitive=true')
        .send({ str: 'nooNabbad' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq(4);
          done();
        });
    });

    it('should be able to handle when required string is not provided', done => {
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

    it('should be able to handle when required string is empty', done => {
      request(app)
        .get('/palindrome/check?str=')
        .send({ str: '' })
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
