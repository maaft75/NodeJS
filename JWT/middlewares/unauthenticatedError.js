const { customError } = require("./customError");
const { StatusCodes } = require("http-status-codes");

class unauthenticatedError extends customError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = {unauthenticatedError}