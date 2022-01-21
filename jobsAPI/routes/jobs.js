const express = require('express')
const router = express.Router()
const { getJobs, getJobById, createJob, deleteJob, updateJob } = require('../controllers/jobs')

router.route('/').post(createJob).get(getJobs)
router.route('/:id').post(getJobById).put(updateJob).delete(deleteJob)

module.exports = router