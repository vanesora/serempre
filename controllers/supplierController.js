    'use strict';

    const suppliersData = require('../data/suppliers');
    const getSuppliers = async (req, rest, next) => {
        try {
            const suppliers = await suppliersData.getSuppliers();
            rest.send(suppliers);
        } catch (error) {
            rest.status(400).send(error.message);
        }
    }

    const getSupplier = async (req, res, next) => {
        try {
            const supplierId = req.params.id;
            const supplier = await suppliersData.getById(supplierId);
            res.send(supplier);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    const getSupplierProducts = async (req, res, next) => {
        try {
            const supplierId = req.params.id;
            const supplier = await suppliersData.getByIdProducts(supplierId);
            res.send(supplier);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    const addSupplier = async (req, res, next) => {
        try {
            const data = req.body;
            const insert = await suppliersData.createSupplier(data, false);
            res.send(insert);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    module.exports ={
        getSuppliers,
        getSupplier,
        getSupplierProducts,
        addSupplier
    }