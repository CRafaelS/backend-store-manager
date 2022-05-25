const productsModels = require('../models/productsModels');

const getAll = async () => {
  const productsServices = await productsModels.getAll();

  return productsServices;
};

const findById = async (id) => {
  const productsServices = await productsModels.findById(id);

  if (!productsServices) return null;

  return productsServices;
};

module.exports = {
  getAll,
  findById,
};