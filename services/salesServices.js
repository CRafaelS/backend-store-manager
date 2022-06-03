const salesModels = require('../models/salesModels');

const reorganizeSales = (data) => ({
  saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const salesServices = await salesModels.getAll();

  return salesServices.map(reorganizeSales);
};

const findById = async (id) => {
  const salesServices = await salesModels.findById(id);
  if (salesServices.length === 0) return null;

  return salesServices.map(reorganizeSales);
};

const addSaleProduct = async (array) => {
  const { id } = await salesModels.addIdSale();
    Promise.all(array.map(async ({ productId, quantity }) => { 
      await salesModels.addSaleProduct(id, productId, quantity);
  }));
  return {
    id,
    itemsSold: array,
  };
};

const updateSaleProduct = async (id, array) => {
    Promise.all(array.map(async ({ productId, quantity }) => { 
      await salesModels.updateSaleProduct(id, productId, quantity);
  }));
  return {
    saleId: id,
    itemUpdated: array,
  };
};

module.exports = {
  getAll,
  findById,
  addSaleProduct,
  updateSaleProduct,
};
