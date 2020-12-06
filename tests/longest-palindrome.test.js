const request = require('supertest');
const express = require('express');
const { expect } = require('chai');
const loaders = require('../src/loaders');
const log = require('../src/utils/logger');
const app = express();

describe('Find longest palindrome test', () => {
  before(async () => {
    log.pause();
    await loaders.init({ expressApp: app });
  });

  describe('Find the longest palindromic substring', () => {
    it('should be able to return the longest palindromic substring', done => {
      request(app)
        .post('/palindrome/longest-substr')
        .send({ str: 'abaxyzzyxf' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq('xyzzyx');
          done();
        });
    });

    it('should be able to parse only alpha numeric parts of the string', done => {
      request(app)
        .post('/palindrome/longest-substr')
        .send({ str: 'abaxyz@@zyxf' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq('xyzzyx');
          done();
        });

    });

    it('should be able to return the longest palindromic substring when the whole string is a palindrome', done => {
      request(app)
        .post('/palindrome/longest-substr')
        .send({ str: 'abababa' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq('abababa');
          done();
        });
    });

    it('should be able to return the longest palindromic substring when case sensitive flag if true', done => {
      request(app)
        .post('/palindrome/longest-substr?caseSensitive=true')
        .send({ str: 'abaxyzZyxf' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.haveOwnProperty('result');
          expect(res.body.result).to.be.eq('aba');
          done();
        });
    });

    it('should be able to handle when required string is not provided', done => {
      request(app)
        .post('/palindrome/longest-substr')
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
        .post('/palindrome/longest-substr?caseSensitive=true')
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
