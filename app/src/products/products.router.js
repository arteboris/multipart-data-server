const express = require('express');
const productsValidator = require('./products.validator');
const productsController = require('./products.controller')

const router = express.Router();

router
.get('/', productsValidator.sendProducts,
productsController.sendProducts)
.get('/:id', productsValidator.sendProductId,
productsController.sendProductId)
.post('/', productsValidator.createProduct, 
productsController.createProduct)
.put('/:id', productsValidator.updateProduct,
productsController.updateProduct)
.delete('/:id', productsValidator.deleteProduct,
productsController.deleteProduct);

module.exports = router;