const winston = require('winston');
const config = require('../config');
const { format } = winston;
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} - [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: config.logs.level,
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', dirname: 'logs' }),
    new winston.transports.File({ filename: 'combined.log', dirname: 'logs' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: myFormat,
  }));
}

logger.info(`Initialized logger with log level: ${config.logs.level}`);
module.exports = logger;
