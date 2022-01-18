const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError } = require('../middleware/customError')

getAllTasks = asyncWrapper(async (req, res) => {
    const task = await Task.find()
    res.status(200).json(task)
})

getTaskById = asyncWrapper(async (req, res, next) => {
    const task = await Task.findOne({_id : req.params.id})
    if(!task){
        return next(createCustomError(`No task with ID : ${req.params.id}`, 404))
    }
    return res.status(200).json(task)
})

createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
})

updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndUpdate(
    {_id:req.params.id}, 
    req.body,
    {new:true,runValidators:true})
    res.status(200).json(task)
})

deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndDelete({_id : req.params.id})
    if(!task){
        return res.status(404).json({message : `No task with ID : ${req.params.id}`})
    }
    return res.status(204).json()
})

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}