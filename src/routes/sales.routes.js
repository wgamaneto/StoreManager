const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateSaleInputs, validateSalesValues } = require('../middlewares/validationSales');

const salesRouter = express.Router();

salesRouter.post('/', validateSaleInputs, validateSalesValues, salesController.insertSale);
salesRouter.put('/:id', validateSaleInputs, validateSalesValues, salesController.updateSale);
salesRouter.delete('/:id', salesController.deleteSale);
salesRouter.get('/', salesController.getSales);
salesRouter.get('/:id', salesController.getSaleById);

module.exports = salesRouter;