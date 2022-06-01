const productsModels = require('../models/productsModels');

const getAll = async () => {
  const productsServices = await productsModels.getAll();

  return productsServices;
};

const findById = async (id) => {
  const [productsServices] = await productsModels.findById(id);
  if (!productsServices) return false;

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
  const allProducts = await productsModels.getAll();
  const findIdProducts = allProducts.some((item) => item.id === Number(id));
  await productsModels.update(id, name, quantity);
  return findIdProducts;
};

const deleteProduct = async (id) => {
  const allProducts = await productsModels.getAll();
  const findIdProducts = allProducts.some((item) => item.id === Number(id));
  await productsModels.deleteProduct(id);
  return findIdProducts;
};

module.exports = {  
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};