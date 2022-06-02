const Joi = require('joi');

const validateName = Joi.object({
  name: Joi.string().min(5).required(),
});

const validateQuantity = Joi.object({
  quantity: Joi.number().min(1).required(),
});

const validateSalesProductId = Joi.object({
  productId: Joi.required(),
});

const validateProductName = (req, res, next) => {
  const { error } = validateName.validate(req.body);
  if (error) {
    const typeErro = error.details[0].type;
    console.log(typeErro);
    if (typeErro === 'string.min') {
      return res.status(422).json({ message: error.message });
    }
    if (typeErro === 'any.required') {
      return res.status(400).json({ message: error.message });
    } 
  }
  return next();
};

const validateProductQuantity = (req, res, next) => {
  const { error } = validateQuantity.validate(req.body);
  if (error) {
    const typeErro = error.details[0].type;
    console.log(typeErro);
    if (typeErro === 'number.min') {
      return res.status(422).json({ message: error.message });
    }
    if (typeErro === 'any.required') {
      return res.status(400).json({ message: error.message });
    } 
  }
  return next();
};

const validateProductId = (req, res, next) => {
  const { error } = validateSalesProductId.validate(req.body);
  if (error) {
      return res.status(400).json({ message: error.message }); 
  }
  return next();
};

module.exports = {
  validateProductName,
  validateProductQuantity,
  validateProductId,
};
