const express = require('express');
const productController = require('../controllers/product.controller');
const { validationProduct } = require('../middlewares/validationProduct');

const productRouter = express.Router();

productRouter.post('/', validationProduct, productController.insertProduct);
productRouter.get('/', productController.getProduct);
productRouter.get('/:id', productController.getProductById);

module.exports = productRouter;