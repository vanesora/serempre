 'use strict';

 const express = require('express');
 const categoryController = require('../controllers/categoryController');
 const router = express.Router();

 const {getCategoryProducts} = categoryController;

 router.get('/categories/:id/products', getCategoryProducts);
 module.exports = {
     routes: router
 }