const customError = require('./customError')

const errorHandler = (err, req, res, next) => {
	console.log(err)
	if(err instanceof customError){
		return res.status(err.statusCode).json({message: err.message})
	}
	return res.status(500).send('An error has occurred, please try again later')
}

module.exports = errorHandler
