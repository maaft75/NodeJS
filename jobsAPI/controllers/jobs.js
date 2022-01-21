const getJobs = (req, res, next) => {
    res.status(200).json({message:"live"})
}

const getJobById = (req, res, next) => {
    res.status(200).json({message:"live"})
}

const createJob = (req, res, next) => {
    res.status(200).json({message:"live"})
}

const updateJob = (req, res, next) => {
    res.status(200).json({message:"live"})
}

const deleteJob = (req, res, next) => {
    res.status(200).json({message:"live"})
}

module.exports = {
    getJobById, getJobs, createJob, updateJob, deleteJob
}