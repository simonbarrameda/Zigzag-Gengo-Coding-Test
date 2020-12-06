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

    if (process.env.NODE_ENV === 'production') {
      console.log(`Server listening on port: ${config.port}`);
      console.log(`Server environment: ${process.env.NODE_ENV}`);
    }

    log.info(`Server listening on port: ${config.port}`);
    log.info(`Server environment: ${process.env.NODE_ENV}`);
  });
}

startServer();
