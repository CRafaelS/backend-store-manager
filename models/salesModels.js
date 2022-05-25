const connections = require('./connections');

const getAll = async () => {
  const [productsModels] = await connections.execute(
    `SELECT p.sale_id, s.date, p.product_id, p.quantity 
      FROM StoreManager.sales_products AS p 
      INNER JOIN StoreManager.sales AS s`,
);
return productsModels;
};

module.exports = {
  getAll,
};