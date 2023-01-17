const productService = require('../services/product.service');

const getProduct = async (_req, res) => {
  const { type, message } = await productService.getProduct();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getProductByName = async (req, res) => {
  const { q } = req.query;

  if (q === '') {
    const { message } = await productService.getProduct();
    return res.status(200).json(message);
  }

  const { type, message } = await productService.getProductByName(q);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.insertProduct(name);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { type, message } = await productService.updateProduct(id, name);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(type).json({ message });

  res.status(204).end();
};

module.exports = {
  getProduct,
  getProductById,
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
};