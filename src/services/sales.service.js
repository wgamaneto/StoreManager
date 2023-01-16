const validateProductInSale = require('../middlewares/validationProductInSale');
const salesModel = require('../models/sales.model');

const getSale = async () => {
  const result = await salesModel.getAllSales();
  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  if (result.length === 0) return { type: 404, message: 'Sale not found' };

  return { type: null, message: result };
};

const insertSales = async (sales) => {
  const error = await validateProductInSale(sales);
  if (error.length > 0) { return { type: 404, message: 'Product not found' }; }

  const saleId = await salesModel.insertSale();

  await Promise.all(sales.map(async (sale) => salesModel.insertProductsSale(saleId, sale)));
  const response = { id: saleId, itemsSold: sales };

  return { type: null, message: response };
};

const updateSale = async (idString, products) => {
  const id = Number(idString);

  const error = await validateProductInSale(products);
  if (error.length > 0) { return { type: 404, message: 'Product not found' }; }

  const saleById = await getSaleById(id);
  if (saleById.type) { return { type: 404, message: 'Sale not found' }; }

  await Promise.all(products.map(async (sale) => salesModel.updateProductsSale(id, sale)));
  const response = { saleId: id, itemsUpdated: products };

  return { type: null, message: response };
};

const deleteSale = async (idString) => {
  const id = Number(idString);

  const { type } = await getSaleById(id);
  if (type) return { type: 404, message: 'Sale not found' };

  const result = await salesModel.deleteSale(id);
  return { type: null, message: result };
};

module.exports = {
  getSale,
  getSaleById,
  insertSales,
  updateSale,
  deleteSale,
};