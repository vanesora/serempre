 'use strict';

 const express = require('express');
 const supplierController = require('../controllers/supplierController');
 const router = express.Router();

 const {getSuppliers, getSupplier, addSupplier, getSupplierProducts} = supplierController;

 router.get('/suppliers', getSuppliers);
 router.get('/supplier/:id', getSupplier);
 router.get('/supplier/:id/products', getSupplierProducts);
 router.post('/supplier', addSupplier);

 module.exports = {
     routes: router
 }