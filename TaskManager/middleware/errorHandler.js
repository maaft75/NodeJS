const { customError } = require("./customError")

const errorHandler = (err, req, res, next) => {
    console.log(err)
    if(err instanceof customError){
        return res.status(err.statusCode).json({
            msg : err.message
        })
    }
    return res.status(500).json('An error has occurred.')
}

module.exports = errorHandler