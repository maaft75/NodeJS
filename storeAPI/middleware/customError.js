class customError extends Error{
	constructor(message, statusCode){
		super(message)
		this.statusCode = statusCode
	}
}

const createCustomErrorMessage = (message, statusCode) => {
	return new customError(message, statusCode)
}

module.exports = { customError, createCustomErrorMessage }
