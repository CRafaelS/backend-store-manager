const connections = require('./connections');

const getAll = async () => {
  const [salesModels] = await connections.execute(
    `SELECT p.sale_id, s.date, p.product_id, p.quantity 
      FROM StoreManager.sales_products AS p 
      INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id`,
);
return salesModels;
};

module.exports = {
  getAll,
};