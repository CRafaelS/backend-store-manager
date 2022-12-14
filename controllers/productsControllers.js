const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const productsControllers = await productsServices.getAll();

  res.status(200).json(productsControllers);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productsControllers = await productsServices.findById(id);

  if (!productsControllers) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(productsControllers);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const productsControllers = await productsServices.create(name, quantity);

  if (!productsControllers) return res.status(409).json({ message: 'Product already exists' });

  res.status(201).json(productsControllers);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const productsControllers = await productsServices.update(id, name, quantity);

  if (!productsControllers) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json({ id: Number(id), name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productsControllers = await productsServices.deleteProduct(id);

  if (!productsControllers) return res.status(404).json({ message: 'Product not found' });

  res.status(204).json();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};