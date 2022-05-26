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

  return salesServices.map((data) => ({
    date: data.date,
    productId: data.product_id,
    quantity: data.quantity,
  }));
};

module.exports = {
  getAll,
  findById,
};
