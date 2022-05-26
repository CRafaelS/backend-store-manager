const connections = require('./connections');

const getAll = async () => {
  const [salesModels] = await connections.execute(
    `SELECT p.sale_id, s.date, p.product_id, p.quantity 
      FROM StoreManager.sales_products AS p 
      INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id`,
);
return salesModels;
};

const findById = async (id) => {
  const [productsModelsData] = await connections.execute(
    `SELECT p.sale_id, s.date, p.product_id, p.quantity 
    FROM StoreManager.sales_products AS p
    INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id WHERE sale_id = ?;`, [id],
);
return productsModelsData;
};

module.exports = {
  getAll,
  findById,
};