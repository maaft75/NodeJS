require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { customError } = require('../middlewares/customError')

registerUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json(user)
    } catch (error) {
        if(error.code == 11000){
            return res.status(400).json({message: "This username is not available."})
        }
        return next(new customError(error, 400))
    }
}

loginUser = async (req, res, next) => {
    try {
        const{username, password} = req.body
        if(!username){
            return res.status(400).json({message:"Please provide a username"})
        }
        if(!password){
            return res.status(400).json({message:"Please provide a password."})
        }

        const user = await User.find(req.body)
        
        if(user.length < 1){
            return res.status(200).json({message:"No user found."})
        }

        const token = jwt.sign({id:user[0].id}, process.env.SECRET_KEY,{expiresIn:'1h'})
        return res.status(200).json({id:user[0].id, token:token})
    } 
    catch (error) {
        return next(new customError(error, 400))
    }
}

module.exports = {registerUser, loginUser}