const productsModels = require('../models/productsModels');

const getAll = async () => {
  const productsServices = await productsModels.getAll();

  return productsServices;
};

const findById = async (id) => {
  const productsServices = await productsModels.findById(id);
  const productsData = productsServices.find((data) => data.id === +id);
  if (!productsData) return false;

  return productsData;
};

const create = async (name, quantity) => {
  const allProducts = await productsModels.getAll();
  const uniqueProducts = allProducts.some((item) => item.name === name);
  if (uniqueProducts) return false;
  
  const productsServices = await productsModels.create(name, quantity);
  return productsServices;
};

module.exports = {  
  getAll,
  findById,
  create,
};