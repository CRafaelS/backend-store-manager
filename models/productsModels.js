const connections = require('./connections');

const getAll = async () => {
  const [productsModels] = await connections.execute(
    'SELECT * FROM StoreManager.products;',
);
return productsModels;
};

const findById = async (id) => {
  const [productsModelsData] = await connections.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
);
return productsModelsData;
};

const create = async (name, quantity) => {
  const [productsModels] = await connections.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?);', [name, quantity],
);
return {
  id: productsModels.insertId,
  name,
  quantity,
};
};

const update = async (id, name, quantity) => {
  await connections.execute(
  `UPDATE StoreManager.products SET name = ?, quantity = ?
    WHERE id = ?`, [name, quantity, id],
  );
};

const deleteProduct = async (id) => {
  await connections.execute(
  'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};
