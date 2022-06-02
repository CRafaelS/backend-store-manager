const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const { 
  validateProductName, 
  validateProductQuantity,
} = require('../middlewares');

const productRouter = express.Router();

productRouter.get('/', productsControllers.getAll);
productRouter.get('/:id', productsControllers.findById);
productRouter.post('/', validateProductName, validateProductQuantity, productsControllers.create);
productRouter.put('/:id', validateProductName, validateProductQuantity, productsControllers.update);
productRouter.delete('/:id', productsControllers.deleteProduct);

module.exports = productRouter;
