const request = require('supertest');
const express = require('express');
const loaders = require('../src/loaders');
const app = express();

describe('Express loader tests', () => {
  before(async () => {
    await loaders.init({ expressApp: app });
  });

  describe('Route not found error handling', () => {
    it('should handle errors caused by requests to non-existant routes', done => {
      request(app)
        .get('/route-that-does-not-exist')
        .expect(404, done);
    });
  });
});
