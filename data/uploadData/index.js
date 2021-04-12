'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const addRegister = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('uploadData');
        const insertSupplier = await pool.request()
            .input('runFirst', sql.Bit, 1)
            .query(sqlQueries.createRegister);
        return insertSupplier.recordset;
    } catch (error) {
        return error.message;
    }
}

const viewRegister = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('uploadData');
        const register = await pool.request().query(sqlQueries.register);
        return register.recordset.length ? register.recordset[0].run_first : false;
    } catch (error) {
        return error.message
    }
}


module.exports = {
    addRegister,
    viewRegister
}