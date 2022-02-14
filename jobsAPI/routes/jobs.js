const express = require('express')
const router = express.Router()
const { getJobsByPoster, createJob, deleteJob, updateJob, getJobsByCompany, getJobsById, getAllJobs } = require('../controllers/jobs')

router.route('/poster').get(getJobsByPoster)
router.route('/company').get(getJobsByCompany)
router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJobsById)

module.exports = router