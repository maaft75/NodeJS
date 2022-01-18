const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name : { 
        type: String,
        required: [true, 'This field is required'],
        unique: [true, 'This username is not available']
    },
    description : { 
        type: String,
        required: [true, 'This field is required']
    }
})

module.exports = mongoose.model('Product', ProductSchema)