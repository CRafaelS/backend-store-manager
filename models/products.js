const connections = require('./connections');

const getAll = async () => {
  const [products] = await connections.execute(
    'SELECT * FROM StoreManager.products;',
);
return products;
};

module.exports = {
  getAll,
};
