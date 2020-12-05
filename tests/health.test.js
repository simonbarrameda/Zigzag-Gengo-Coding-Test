const request = require('supertest');
const express = require('express');
const loaders = require('../src/loaders');
const app = express();

describe('Health test', () => {
  before(async () => {
    await loaders.init({ expressApp: app });
  });

  describe('GET /health', () => {
    it('should return health', done => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});
