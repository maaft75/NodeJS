const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "This is a required field"]
    },
    emailAddress : {
        type: String,
        unique: true,
        required: [true, "This is a required field"]
    },
    password : {
        type: String,
        required: [true, "This is a required field"]
    }
})


module.exports = mongoose.model('User', userSchema)