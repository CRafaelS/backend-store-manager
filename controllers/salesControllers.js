const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const salesControllers = await salesServices.getAll();

  res.status(200).json(salesControllers);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const salesControllers = await salesServices.findById(id);

  if (!salesControllers) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(salesControllers);
};

module.exports = {
  getAll,
  findById,
};
