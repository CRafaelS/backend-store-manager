const express = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRouter = express.Router();

salesRouter.get('/', salesControllers.getAll);
salesRouter.get('/:id', salesControllers.findById);

module.exports = salesRouter;