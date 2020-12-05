const express = require('express');
const config = require('./config');
const loaders = require('./loaders');
const log = require('./utils/logger');

async function startServer() {
  const app = express();

  /**
   * Initialize server loaders
   */
  await loaders.init({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      log.error(err);
      process.exit(1);
    }
    log.info(`Server listening on port: ${config.port}`);
    log.info(`Server environment: ${process.env.NODE_ENV}`);
  });
}

startServer();
