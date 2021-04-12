    'use strict';

    const categoriesData = require('../data/categories');

    const getCategoryProducts = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const category = await categoriesData.getByIdProducts(categoryId);
            res.send(category);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    module.exports ={
        getCategoryProducts,
    }