const request = require('supertest');
const express = require('express');
const loaders = require('../src/loaders');
const log = require('../src/utils/logger');
const app = express();

describe('Health test', () => {
  before(async () => {
    log.pause();
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
