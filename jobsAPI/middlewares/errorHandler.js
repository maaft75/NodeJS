const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let customerErrorArray = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message:err.message || 'Something went wrong, please try again later.'
    }

    if(err.code === 11000){
        customerErrorArray.message = `${Object.values(err.keyValue)[0]} is not available.`
        customerErrorArray.statusCode = StatusCodes.BAD_REQUEST
    }

    if(err.name === "ValidationError"){
        customerErrorArray.message = `${Object.values(err.errors).map((i) => i.message)}`
        customerErrorArray.statusCode = StatusCodes.BAD_REQUEST
    }

    if(err.name === "CastError"){
        customerErrorArray.message = `Invalid ID: ${err.value}.`
        customerErrorArray.statusCode = StatusCodes.BAD_REQUEST
    }

    return res.status(customerErrorArray.statusCode).json({message:customerErrorArray.message})
}

module.exports = errorHandler