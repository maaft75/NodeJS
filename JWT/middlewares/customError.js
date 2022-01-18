class customError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

createCustomError = (statusCode, message) => {
    return new customError(statusCode, message)
}

module.exports = { customError, createCustomError }