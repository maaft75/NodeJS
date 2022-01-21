const { customError } = require("./customError")
const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    if(err instanceof customError){
        return res.status(err.statusCode).json({message:err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:`An error has occurred.`})
}

module.exports = errorHandler