'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const products = require('../products/index');

const formatCategories = (categories) => {
    return !categories ? [] : categories.map((category) => {
        return  {
                description: category.Description,
                id: category.CategoryID,
                name: category.CategoryName,
                picture: category.Picture
            }
        })
}

const getCategories = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('categories');
        const categoriesList = await pool.request().query(sqlQueries.categorieslist);
        return formatCategories(categoriesList.recordset);
    } catch (error) {
        return error.message
    }
}

const getById = async (categoryId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('categories');
        const category = await pool.request()
            .input('categoryId', sql.Int, categoryId)
            .query(sqlQueries.categorybyId);
        return formatCategories(category.recordset);
    } catch (error) {
        return error.message;
    }
}

const getByIdProducts = async (categoryId) => {
    try {
        const category = await getById(categoryId);
        const productsList = await products.getProductsByCategory(categoryId);
        return category.map((data) => {
            data.products= productsList;
            return data
        })
    } catch (error) {
        return error.message;
    }
}

const createCategory = async (categoryData, notAutoInc) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('categories');
        const insertCategory = await pool.request()
            .input('CategoryID', sql.Int, parseInt(categoryData.CategoryID))
            .input('CategoryName', sql.NVarChar(15), categoryData.CategoryName)
            .input('Description', sql.NVarChar('max'), categoryData.Description)
            .input('Picture', sql.NText, categoryData.Picture)
            .query(notAutoInc ? sqlQueries.createCategoryN : sqlQueries.createCategory);
        return insertCategory.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getCategories,
    getById,
    getByIdProducts,
    createCategory
}