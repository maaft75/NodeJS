const express = require('express')
const router = express.Router()

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controller/task')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask)

module.exports = router