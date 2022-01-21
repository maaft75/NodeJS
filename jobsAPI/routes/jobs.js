const express = require('express')
const router = express.Router()
const { getJobs, getJobById, createJob, deleteJob, updateJob } = require('../controllers/jobs')

router.route('/').post(createJob).get(getJobs)
router.route('/:id').get(getJobById).put(updateJob).delete(deleteJob)
module.exports = router