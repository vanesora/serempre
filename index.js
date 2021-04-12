'use strict';
const express = require('express');
const config = require ('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const uploadData = require('./uploadDataBase')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', supplierRoutes.routes);
app.use('/api', productRoutes.routes);
app.use('/api', categoryRoutes.routes);

app.listen(config.port, () => {
    console.log('Server is listening on http://localhost:' + config.port);
    uploadData.uploadData();
});