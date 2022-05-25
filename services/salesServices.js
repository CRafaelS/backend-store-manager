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

module.exports = {
  getAll,
};
