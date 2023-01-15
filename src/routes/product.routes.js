const express = require('express');
const productController = require('../controllers/product.controller');
const { validationProduct } = require('../middlewares/validationProduct');

const productRouter = express.Router();

productRouter.get('/', productController.getProduct);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', validationProduct, productController.insertProduct);

module.exports = productRouter;