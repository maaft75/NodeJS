require('dotenv').config()
const jwt = require('jsonwebtoken')
const Product = require('../models/product')
const { customError } = require('../middlewares/customError')

const getAllProducts = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next(new customError('No/Invalid Token provided', 401))
    }

    try {
        const verifiedToken = jwt.verify(authHeader.split(' ')[1], process.env.SECRET_KEY)
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        return next(new customError(error, 400))
    }
}

module.exports = getAllProducts