const productModel = require('../models/product.model');

const getProduct = async () => {
  const result = await productModel.getAllProducts();
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id);
  if (!result) return { type: 404, message: 'Product not found' };

  return { type: null, message: result };
};

const getProductByName = async (name) => {
  const result = await productModel.getProductByName(name);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

const insertProduct = async (name) => {
  const result = await productModel.insertProduct(name);
  return { type: null, message: result };
};

const updateProduct = async (idString, name) => {
  const id = Number(idString);
  const { type } = await getProductById(id);
  if (type) return { type: 404, message: 'Product not found' };
  const result = await productModel.updateProduct(id, name);
  return { type: null, message: result };
};

const deleteProduct = async (idString) => {
  const id = Number(idString);

  const { type } = await getProductById(id);
  if (type) return { type: 404, message: 'Product not found' };

  const result = await productModel.deleteProduct(id);
  return { type: null, message: result };
};

module.exports = {
  getProduct,
  getProductById,
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
};