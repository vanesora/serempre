'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const products = require('../products/index');

const formatSuppliers = (suppliers) => {
    return suppliers.map((sup) => {
        return {
            address: {
                city: sup.City,
                country: sup.Country,
                phone: sup.phone,
                postalCode: sup.PostalCode,
                region: sup.Region,
                street: sup.Address,
            },
            companyName: sup.CompanyName,
            contactName: sup.ContactName,
            contactTitle: sup.ContactTitle,
            id: sup.SupplierID
        }
    })
}

const getSuppliers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('suppliers');
        const suppliersList = await pool.request().query(sqlQueries.supplierslist);
        return formatSuppliers(suppliersList.recordset);
    } catch (error) {
        return error.message
    }
}

const getById = async (supplierId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('suppliers');
        const supplier = await pool.request()
            .input('supplierId', sql.Int, supplierId)
            .query(sqlQueries.supplierbyId);
        return formatSuppliers(supplier.recordset);
    } catch (error) {
        return error.message;
    }
}

const getByIdProducts = async (supplierId) => {
    try {
        const supplier = await getById(supplierId);
        const productsList = await products.getProductsBySupplier(supplierId);
        return supplier.map((data) => {
            data.products= productsList;
            return data
        })
    } catch (error) {
        return error.message;
    }
}

const createSupplier = async (supplierData, notAutoInc) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('suppliers');
        const insertSupplier = await pool.request()
            .input('SupplierID', sql.Int, parseInt(supplierData.SupplierID))
            .input('CompanyName', sql.NVarChar(40), supplierData.CompanyName)
            .input('ContactName', sql.NVarChar(30), supplierData.ContactName)
            .input('ContactTitle', sql.NVarChar(30), supplierData.ContactTitle)
            .input('Address', sql.NVarChar(60), supplierData.Address)
            .input('City', sql.NVarChar(15), supplierData.City)
            .input('Region', sql.NVarChar(15), supplierData.Region)
            .input('PostalCode', sql.NVarChar(15), supplierData.PostalCode)
            .input('Country', sql.NVarChar(15), supplierData.Country)
            .input('Phone', sql.NVarChar(15), supplierData.Phone)
            .input('Fax', sql.NVarChar(15), supplierData.Fax)
            .input('HomePage', sql.NText, supplierData.HomePage)
            .query(notAutoInc? sqlQueries.createSupplierN : sqlQueries.createSupplier);
        return insertSupplier.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getSuppliers,
    getById,
    getByIdProducts,
    createSupplier
}