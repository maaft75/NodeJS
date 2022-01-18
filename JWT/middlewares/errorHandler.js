const {customError} = require('./customError')

const errorHandler = (err,req,res,next) => {
    if(err instanceof customError){
        return res.status(err.statusCode).json({message: err.message})
    }

    return res.status(500).json({message: "Something went wrong, Please try again later."})
}

module.exports = errorHandler