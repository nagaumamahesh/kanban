const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const tasksController = require('../controllers/task-controller')

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.addTask)
router.get('/:id', tasksController.getById);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;