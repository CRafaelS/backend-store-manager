const connections = require('./connections');

const getAll = async () => {
  const [productsModels] = await connections.execute(
    'SELECT * FROM StoreManager.products;',
);
return productsModels;
};

module.exports = {
  getAll,
};
