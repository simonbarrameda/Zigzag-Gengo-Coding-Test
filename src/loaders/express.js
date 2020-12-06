const bodyParser = require('body-parser');
const cors = require('cors');
const { isCelebrate } = require('celebrate');
const routes = require('../api');
const log = require('../utils/logger');
const { ERRORS } = require('../utils/constants');

module.exports = async ({ app }) => {
  // Health check endpoints
  app.get('/health', (req, res) => {
    res.send('The server is up and running');
  });

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API Routes
  app.use('/', routes);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Route does not exist');
    err.status = 404;
    err.code = ERRORS.NOT_FOUND;
    next(err);
  });

  /// error handlers

  /**
   * Celebrate error handler
   * Errors origintating celebrate() are objects with the following keys:
   *
   * joi - The full joi error object. See Joi documentation
   * meta - On object with the following keys:
   *   source - A string indicating the step where the validation failed. Will be one of 'params', 'headers', 'query', 'cookies', 'signedCookies', or 'body'
   */
  app.use((err, req, res, next) => {
    if (isCelebrate(err)) {
      const errResponse = { code: ERRORS.VALIDATION_ERROR };
      errResponse.message = err.joi.message;
      errResponse.error = {
        source: err.meta.source,
        keys: err.joi.details.map(e => e.context.key)
      };
      log.error(errResponse);
      return res.status(400).json(errResponse);
    }
    return next(err);
  });
  // app.use(errors());

  // General error handler
  app.use((err, req, res, next) => {
    if (!err.code) log.error('Unknown Error:', err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      code: err.code || ERRORS.UNKNOWN_ERROR
    });
    return next();
  });
};
