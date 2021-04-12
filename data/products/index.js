'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const formatProductsList = (products, query, total) => {
    return products.map((product) => {
        return {
            currentPage: query.page,
            items: formatProducts(products),
            perPage: query.size,
            total
        }
    })
}

const formatProducts = (products) => {
    return !products ? [] : products.map((product) => {
        return {
            category: {
                description: product.Description,
                id: product.CategoryID,
                name: product.CategoryName,
                picture: product.Picture
            },
            discontinued: product.Discontinued,
            id: product.ProductID,
            productName: product.ProductName,
            quantityPerUnit: product.QuantityPerUnit,
            reorderLevel: product.ReorderLevel,
            supplier: {
                address: {
                    city: product.City,
                    country: product.Country,
                    phone: product.Phone,
                    postalCode: product.PostalCode,
                    region: product.Region,
                    street: product.Address
                },
                companyName: product.CompanyName,
                contactName: product.ContactName,
                contactTitle: product.ContactTitle,
                id: product.SupplierID
            },
            unitPrice: product.UnitPrice,
            unitsInStock: product.UnitsInStock,
            unitsOnOrder: product.UnitsOnOrder
        }
    })
}

const formatProductsCategory = (products) => {
    return !products ? [] : products.map((product) => {
        return {
            discontinued: product.Discontinued,
            id: product.ProductID,
            productName: product.ProductName,
            quantityPerUnit: product.QuantityPerUnit,
            reorderLevel: product.ReorderLevel,
            supplier: {
                address: {
                    city: product.City,
                    country: product.Country,
                    phone: product.Phone,
                    postalCode: product.PostalCode,
                    region: product.Region,
                    street: product.Address
                },
                companyName: product.CompanyName,
                contactName: product.ContactName,
                contactTitle: product.ContactTitle,
                id: product.SupplierID
            },
            unitPrice: product.UnitPrice,
            unitsInStock: product.UnitsInStock,
            unitsOnOrder: product.UnitsOnOrder
        }
    })
}


const formatProductsSupplier = (products) => {
    return !products ? [] : products.map((product) => {
        return {
            categoryID: product.CategoryID,
            categoryName: product.CategoryName,
            id: product.ProductID,
            productName: product.ProductName,
        }
    })
}

const getProducts = async (query) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request()
            .input('init', sql.Int, query.init)
            .input('size', sql.Int, query.size)
            .query(query.order === 'des' ? sqlQueries.productslistDESC : sqlQueries.productslistASC);
        return formatProductsList(productsList.recordset, query, productsList.recordsets[1][0].size);
    } catch (error) {
        return error.message
    }
}

const getProductsSearch = async (query) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request()
            .input('companyName', sql.NVarChar(40), query.companyName ? `%${query.companyName}%` : '')
            .input('productName', sql.NVarChar(40), query.productName ? `%${query.productName}%` : '')
            .input('categoryName', sql.NVarChar(15), query.productName ? `%${query.categoryName}%` : '')
            .query(sqlQueries.productslistSearch);
        return formatProducts(productsList.recordset);
    } catch (error) {
        return error.message
    }
}

const getById = async (productId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const product = await pool.request()
            .input('productId', sql.Int, productId)
            .query(sqlQueries.productbyId);
        return formatProducts(product.recordset);
    } catch (error) {
        return error.message;
    }
}

const getProductsByCategory = async (categoryID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request()
            .input('categoryID', sql.Int, categoryID)
            .query(sqlQueries.productslistCategory);
        return formatProductsCategory(productsList.recordset);
    } catch (error) {
        return error.message
    }
}

const getProductsBySupplier = async (supplierID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const productsList = await pool.request()
            .input('supplierID', sql.Int, supplierID)
            .query(sqlQueries.productslistSupplier);
        return formatProductsSupplier(productsList.recordset);
    } catch (error) {
        return error.message
    }
}

const createProduct = async (productData, notAutoInc) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const insertProduct = await pool.request()
            .input('ProductID', sql.Int, parseInt(productData.ProductID))
            .input('ProductName', sql.NVarChar(40), productData.ProductName)
            .input('SupplierID', sql.Int, parseInt(productData.SupplierID))
            .input('CategoryID', sql.Int, parseInt(productData.CategoryID))
            .input('QuantityPerUnit', sql.NVarChar(20), productData.QuantityPerUnit)
            .input('UnitPrice', sql.Decimal(15, 4), parseFloat(productData.UnitPrice))
            .input('UnitsInStock', sql.SmallInt, productData.UnitsInStock)
            .input('UnitsOnOrder', sql.SmallInt, productData.UnitsOnOrder)
            .input('ReorderLevel', sql.SmallInt, productData.ReorderLevel)
            .input('Discontinued', sql.Bit, productData.Discontinued)
            .query(notAutoInc ? sqlQueries.createProductN : sqlQueries.createProduct);
        let productId = insertProduct.recordset[0];
        return getById(productId.ProductID);
    } catch (error) {
        return error.message;
    }
}

const updateProduct = async (productId, productData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const updateProduct = await pool.request()
            .input('ProductID', sql.Int, productId)
            .input('ProductName', sql.NVarChar(40), productData.ProductName)
            .input('SupplierID', sql.Int, parseInt(productData.SupplierID))
            .input('CategoryID', sql.Int, parseInt(productData.CategoryID))
            .input('QuantityPerUnit', sql.NVarChar(20), productData.QuantityPerUnit)
            .input('UnitPrice', sql.Decimal(15, 4), parseFloat(productData.UnitPrice))
            .input('UnitsInStock', sql.SmallInt, productData.UnitsInStock)
            .input('UnitsOnOrder', sql.SmallInt, productData.UnitsOnOrder)
            .input('ReorderLevel', sql.SmallInt, productData.ReorderLevel)
            .input('Discontinued', sql.Bit, productData.Discontinued)
            .query(sqlQueries.updateProduct);
        return getById(productId);
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getProducts,
    getProductsSearch,
    getById,
    getProductsByCategory,
    getProductsBySupplier,
    createProduct,
    updateProduct
}