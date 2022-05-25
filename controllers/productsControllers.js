const products = require('../services/productsServices');

const getAll = async (_req, res) => {
  const product = await products.getAll();

  res.status(200).json(product);
};

module.exports = {
  getAll,
};