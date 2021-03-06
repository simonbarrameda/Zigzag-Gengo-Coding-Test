const expressLoader = require('./express');
const log = require('../utils/logger');

const init = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  log.info('Express middlewares loaded');
};

module.exports = { init };
