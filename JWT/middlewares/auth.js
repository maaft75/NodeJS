require('dotenv').config()
const jwt = require('jsonwebtoken')
const { unauthorizedError } = require('../middlewares/unauthorizedError')
const { unauthenticatedError } = require('../middlewares/unauthenticatedError')

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return next(new unauthenticatedError('No/Invalid Token provided.'))
        }

        const verifiedToken = jwt.verify(authHeader.split(' ')[1], process.env.SECRET_KEY)
        next()
    } catch (error) {
        console.log(error)
        return next(new unauthorizedError('Not authorized to access this route.'))
    }
}

module.exports = authMiddleware