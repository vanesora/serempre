const csv = require('csv-parser');
const fs = require('fs');
const addSupplier = require('./data/suppliers/index');
const addCategory = require('./data/categories/index');
const addProduct = require('./data/products/index');
const upload = require('./data/uploadData/index');


const readCsv = (url) => {
    fs.createReadStream(`data_bases/${url}.csv`)
        .pipe(csv())
        .on('data', (row) => {
            url === 'Suppliers' && addSupplier.createSupplier(row,true);
            url === 'Categories' && addCategory.createCategory(row,true);
            url === 'Products' && addProduct.createProduct(row,true);
        })
        .on('end', (err) => {
            console.log('CSV file successfully processed ' + err);
        });
}


const uploadData = async() => {
    uploadDataConditional = await upload.viewRegister();
    !uploadDataConditional && await readCsv('Categories');
    !uploadDataConditional && await readCsv('Suppliers');
    !uploadDataConditional && await readCsv('Products');
    await upload.addRegister();
}

module.exports = {
    uploadData
}