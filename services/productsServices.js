const products = require('../models/productsModels');

const getAll = async () => {
  const product = await products.getAll();

  return product;
};

module.exports = {
  getAll,
};