const dotenv = require('dotenv');
const envFound = dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (envFound.error && process.env.NODE_ENV === 'development') {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
};
