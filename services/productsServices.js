const productsModels = require('../models/productsModels');

const getAll = async () => {
  const productsServices = await productsModels.getAll();

  return productsServices;
};

const findById = async (id) => {
  const productsServices = await productsModels.findById(id);
  if (productsServices.length === 0) return false;

  return productsServices;
};

const create = async (name, quantity) => {
  const allProducts = await productsModels.getAll();
  const uniqueProducts = allProducts.some((item) => item.name === name);
  if (uniqueProducts) return false;
  
  const productsServices = await productsModels.create(name, quantity);
  return productsServices;
};

const update = async (id, name, quantity) => {
  const productsServices = await productsModels.update(id, name, quantity);
  return productsServices;
};

module.exports = {  
  getAll,
  findById,
  create,
  update,
};