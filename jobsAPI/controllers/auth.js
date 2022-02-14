require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { customError } = require('../middlewares/customError')

const register = async (req, res, next) => {
    const user = await User.create(req.body)
    const { name, emailAddress } = user
    return res.status(StatusCodes.CREATED).json({
        name:name, 
        emailAddress:emailAddress
    })
}

const login = async (req, res, next) => {
    const { name, password } = req.body

    if(!name || name == '' || !password || password == ''){
        return next(new customError(`Please provide your username and password.`, StatusCodes.BAD_REQUEST))
    }

    const userWithName = await User.findOne({name})

    if(userWithName === null){
        return next(new customError(`Invalid credentials.`, StatusCodes.UNAUTHORIZED))
    }

    const checkIfPasswordIsCorrect = bcrypt.compareSync(password, userWithName.password)

    if(!checkIfPasswordIsCorrect){
        return next(new customError(`Invalid credentials.`, StatusCodes.UNAUTHORIZED))
    }

    const token = jwt.sign({id:userWithName.id}, process.env.SECRET_KEY, {expiresIn:'1h'})
    return res.status(200).json({id: userWithName.id, token : token})
}

module.exports = {
    register, login
}