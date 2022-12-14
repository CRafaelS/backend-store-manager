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

const addSaleProduct = async (req, res) => {
  const array = req.body;
  const salesControllers = await salesServices.addSaleProduct(array);

  if (!salesControllers) return res.status(400).json({ message: 'Sale not found' });

  res.status(201).json(salesControllers);
};

const updateSaleProduct = async (req, res) => {
  const { id } = req.params;
  const array = req.body;
  const salesControllers = await salesServices.updateSaleProduct(id, array);

 if (!salesControllers) return res.status(400).json({ message: 'Sale not found' });

  res.status(200).json(salesControllers);
};

const deleteSaleProduct = async (req, res) => {
  const { id } = req.params;
  const salesControllers = await salesServices.deleteSaleProduct(id);

  if (!salesControllers) return res.status(404).json({ message: 'Sale not found' });

  res.status(204).json();
};

module.exports = {
  getAll,
  findById,
  addSaleProduct,
  updateSaleProduct,
  deleteSaleProduct,
};
