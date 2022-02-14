const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type: String,
        unique: true,
        minlength: [6, 'Username must be more than 6 characters'],
        maxlength: [15, 'Username must be less than 15 characters'],
        required: [true, "Name is required"]
    },
    emailAddress : {
        type: String,
        unique: true,
        required: [true, "Email Address is required"],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address']
    },
    password : {
        type: String,
        required: [true, "Password is required"]
    }
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = mongoose.model('User', userSchema)