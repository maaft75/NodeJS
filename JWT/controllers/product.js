const Product = require('../models/product')
const { StatusCodes } = require('http-status-codes')
const { customError } = require('../middlewares/customError')

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        return res.status(StatusCodes.OK).json(products)
    } catch (error) {
        return next(new customError(error, StatusCodes.BAD_REQUEST))
    }
}

module.exports = getAllProducts