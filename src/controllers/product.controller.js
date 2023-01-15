const productService = require('../services/product.service');

const getProduct = async (_req, res) => {
  const { type, message } = await productService.getProduct();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);

  console.log(message);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  getProduct,
  getProductById,
};