const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    company : {
        type: String,
        required: [true, "This is a required field"]
    },
    role : {
        type: String,
        required: [true, "This is a required field"]
    },
    description : {
        type: String,
        required: [true, "This is a required field"]
    },
    requirements : {
        type: String,
        required: [true, "This is a required field"]
    },
    salary : {
        type: Number,
        required: [true, "This is a required field"]
    },
    datePosted : {
        type: Date,
        default: Date.now(),
        required: [true, "This is a required field"]
    },
    expires : {
        type: Date,
        required: [true, "This is a required field"]
    },
    poster : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "This is a required field"]
    },
})

module.exports = mongoose.model('Job', jobSchema)