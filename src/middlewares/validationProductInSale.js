const productModel = require('../models/product.model');

const validateProductInSale = async (sales) => {
  const error = [];

  await Promise.all(sales.map(async ({ productId }) => {
    const product = await productModel.getProductById(productId);

    if (product === undefined) {
      error.push('erro');
    }
  }));

  return error;
};

module.exports = validateProductInSale;