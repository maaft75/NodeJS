const saltRounds = 10;
const bcrypt = require('bcrypt');
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { customError } = require('../middlewares/customError')

const register = async (req, res, next) => {
    try {
        const { password } = req.body

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err){
                return next(new customError(err, StatusCodes.BAD_REQUEST))
            }
            req.body.password = hash
            
            try {
                const user = await User.create(req.body)
                return res.status(StatusCodes.CREATED).json(user)
            } 
            catch (error) {
                if(error.code = 11000){
                    return next(new customError(`This email address is not available.`, StatusCodes.BAD_REQUEST))
                }
            }
        }); 
    } 
    catch (error) {
        return next(new customError(error, StatusCodes.BAD_REQUEST))
    }
}

const login = (req, res, next) => {
    res.status(200).json({message:"live"})
}

module.exports = {
    register, login
}