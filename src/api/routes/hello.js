const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const log = require('../../utils/logger');

const route = Router();

module.exports = app => {
  app.use('/hello', route);

  route.get('/', (req, res) => {
    log.info('Hello world API!');
    res.json({ message: 'Hello world' });
  });

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required('Name is required')
      })
    }),
    (req, res) => {
      const { name } = req.body;
      res.json({
        message: `Hello, ${name}!`
      });
    }
  );
};
