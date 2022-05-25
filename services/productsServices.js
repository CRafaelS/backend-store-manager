const productsModels = require('../models/productsModels');

const getAll = async () => {
  const productsServices = await productsModels.getAll();

  return productsServices;
};

const findById = async (id) => {
  const productsServices = await productsModels.findById(id);
  const productsData = productsServices.find((data) => data.id === +id);
  if (!productsData) return null;

  return productsData;
};

module.exports = {
  getAll,
  findById,
};