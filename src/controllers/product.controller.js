const productService = require('../services/product.service');

const getAll = async (_req, res) => {
  const { message } = await productService.getAll();
  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const create = async (req, res) => {
  const { type, message } = await productService.create(req.body);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.update(id, req.body);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.remove(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json();
};

const filterByName = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.filterByName(q);
  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  filterByName,
};