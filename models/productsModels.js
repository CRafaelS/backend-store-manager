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
return productsModels;
};

module.exports = {
  getAll,
  findById,
  create,
};
