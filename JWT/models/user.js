const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : { 
        type: String,
        required: [true, 'This field is required'],
        unique: [true, 'This username is not available']
    },
    password : { 
        type: String,
        required: [true, 'This field is required']
    }
})

module.exports = mongoose.model('User', UserSchema)