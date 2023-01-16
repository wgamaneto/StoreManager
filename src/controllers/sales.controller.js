const salesService = require('../services/sales.service');

const getSales = async (_req, res) => {
  const { message } = await salesService.getSale();

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const insertSale = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.insertSales(sales);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const products = req.body;
  const { id } = req.params;

  const { type, message } = await salesService.updateSale(id, products);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(type).json({ message });

  res.status(204).end();
};

module.exports = {
  getSales,
  getSaleById,
  insertSale,
  deleteSale,
  updateSale,
};