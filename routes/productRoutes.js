 'use strict';

 const express = require('express');
 const productController = require('../controllers/productController');
 const router = express.Router();

 const {getProducts, getProduct, addProduct, getProductsSearch, updateProduct} = productController;

 router.get('/products', getProducts);
 router.get('/products/search', getProductsSearch);
 router.get('/product/:id', getProduct);
 router.post('/product', addProduct);
 router.put('/product/:id', updateProduct);

 module.exports = {
     routes: router
 }