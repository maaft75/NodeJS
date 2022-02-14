require('dotenv').config()
const Jobs = require('../models/job')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { customError } = require('../middlewares/customError')

const getJobsByPoster = async (req, res, next) => {
    const jobs = await Jobs.find({poster:req.body.poster}).sort('datePosted')
    if(jobs === null){
        return res.status(StatusCodes.OK).json({message: `No Jobs posted by this poster.`})
    }
    return res.status(StatusCodes.OK).json(jobs)
}

const getJobsByCompany = async (req, res, next) => {
    const jobs = await Jobs.find({company:req.body.company}).sort('datePosted')
    if(jobs === null){
        return res.status(StatusCodes.OK).json({message: `No Jobs posted from this company.`})
    }
    return res.status(StatusCodes.OK).json(jobs)
}

const getJobsById = async(req, res, next) => {
    const job = await Jobs.findById(req.params.id)
    if(job === null){
        return res.status(StatusCodes.OK).json({message: `No Job with this ID: ${req.params.id}`})
    }
    return res.status(StatusCodes.OK).json(job)
}

const createJob = async (req, res, next) => {
    const user = await User.findById(req.body.poster)
    if(user === null){
        return next(new customError("No user with the ID provided.", StatusCodes.BAD_REQUEST))
    }
    const job = await Jobs.create(req.body)
    return res.status(StatusCodes.CREATED).json(job)
}

const updateJob = async (req, res, next) => {
    const { params: {id}, body } = req
    const job = await Jobs.findByIdAndUpdate(id, body, {new:true, runValidators:true})
    if(job === null){
        return res.status(StatusCodes.OK).json({message: `No Job with this ID: ${id}`})
    }
    return res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req, res, next) => {
    const { params: {id} } = req
    const job = await Jobs.findByIdAndDelete(id)
    if(job === null){
        return res.status(StatusCodes.OK).json({message: `No Job with this ID: ${req.params.id}`})
    }
    return res.status(StatusCodes.OK).json({message: "Job deleted."})
}

const getAllJobs = async(req, res, next) => {
    const jobs = await Jobs.find()
    return res.status(StatusCodes.OK).json(jobs)
}

module.exports = {
    getJobsByPoster, createJob, updateJob, deleteJob, getJobsByCompany, getJobsById, getAllJobs
}