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
  const [salesModelsData] = await connections.execute(
    `SELECT s.date, p.product_id, p.quantity 
    FROM StoreManager.sales_products AS p
    INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id WHERE sale_id = ?;`, [id],
);
return salesModelsData;
};

const addIdSale = async () => {
  const [salesModelsData] = await connections.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
);
return {
  id: salesModelsData.insertId,
};
};

const addSaleProduct = async (saleId, productId, quantity) => {
  await connections.execute(
    `INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?);`, [saleId, productId, quantity],
);
  return {
    productId,
    quantity,
  };
};

module.exports = {
  getAll,
  findById,
  addIdSale,
  addSaleProduct,
};