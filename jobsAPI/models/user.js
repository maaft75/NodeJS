const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is required."]
    },
    emailAddress : {
        type: String,
        unique: true,
        required: [true, "Email Adress is required."],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address']
    },
    password : {
        type: String,
        required: [true, "Password is required"]
    }
})


module.exports = mongoose.model('User', userSchema)