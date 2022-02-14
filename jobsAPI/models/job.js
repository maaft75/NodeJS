const mongoose = require('mongoose')
const User = require('./user')

const jobSchema = mongoose.Schema({
    company : {
        type: String,
        required: [true, "Company is a required field"]
    },
    role : {
        type: String,
        required: [true, "Role is a required field"]
    },
    description : {
        type: String,
        required: [true, "Description is a required field"]
    },
    requirements : {
        type: String,
        required: [true, "Requirements is a required field"]
    },
    salary : {
        type: Number,
        required: [true, "Salary is a required field"]
    },
    datePosted : {
        type: Date,
        default: Date.now(),
        required: [true, "This is a required field"]
    },
    expires : {
        type: Date,
        required: [true, "Closing date is a required field"]
    },
    status: {
        type: String,
        enum: {
            values: ['Scheduled for interview', 'Declined', 'Pending'],
            message: "Status can only be Pending, Declined or Scheduled for interview"
        },
        default: "Pending"
    },
    poster : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "Poster is a required field"]
    }
})

module.exports = mongoose.model('Job', jobSchema)