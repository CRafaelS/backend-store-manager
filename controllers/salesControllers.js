const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const salesControllers = await salesServices.getAll();

  res.status(200).json(salesControllers);
};

module.exports = {
  getAll,
};
