const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name : {
        type: String,
        unique : [true, "Name must be unique."],
        required: [true, "Name must be provided."]
    },
    completed:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)