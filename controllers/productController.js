'use strict';

const productsData = require('../data/products');

const getProducts = async (req, rest, next) => {
    try {
        const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        const size = parseInt(req.query.size) ? parseInt(req.query.size) : 100;
        const order = req.query.order;
        const query = {
            init: size * (page - 1),
            size,
            order,
            page
        };
        const products = await productsData.getProducts(query);
        rest.send(products);
    } catch (error) {
        rest.status(400).send(error.message);
    }
}

const getProductsSearch = async (req, rest, next) => {
    try {
        const query = {
            companyName: req.query.company,
            productName: req.query.product,
            categoryName: req.query.category,
        };
        if (!query.companyName && !query.ProductName && !query.CategoryName) {
            rest.status(400).send('Debe existir al menos un filtro');
        } else {
            const products = await productsData.getProductsSearch(query);
            rest.send(products);
        }
    } catch (error) {
        rest.status(400).send(error.message);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productsData.getById(productId);
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = {
            CategoryID: req.body.categoryID,
            Discontinued: req.body.discontinued,
            ProductName: req.body.productName,
            QuantityPerUnit: req.body.quantityPerUnit,
            ReorderLevel: req.body.reorderLevel,
            SupplierID: req.body.supplierID,
            UnitPrice: req.body.unitPrice,
            UnitsInStock: req.body.unitsInStock,
            UnitsOnOrder: req.body.unitsOnOrder
        };
        const insert = await productsData.createProduct(data, false);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = {
            CategoryID: req.body.categoryID,
            Discontinued: req.body.discontinued,
            ProductName: req.body.productName,
            QuantityPerUnit: req.body.quantityPerUnit,
            ReorderLevel: req.body.reorderLevel,
            SupplierID: req.body.supplierID,
            UnitPrice: req.body.unitPrice,
            UnitsInStock: req.body.unitsInStock,
            UnitsOnOrder: req.body.unitsOnOrder
        };
        const updated = await productsData.updateProduct(productId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProducts,
    getProductsSearch,
    getProduct,
    addProduct,
    updateProduct
}