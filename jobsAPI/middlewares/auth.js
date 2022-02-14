const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { customError } = require('../middlewares/customError')

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return next(new customError("No/Invalid token provided", StatusCodes.UNAUTHORIZED))
        }
        jwt.verify(authHeader.split(' ')[1], process.env.SECRET_KEY)
        next()
    } catch (error) {
        return next(new customError("You are not authorized to access this route", StatusCodes.UNAUTHORIZED))
    }
}

module.exports = verifyToken