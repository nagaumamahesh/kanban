const Task = require('../models/Task');

const getAllTasks = async (req, res, next) => {
    let tasks;
    try {
        tasks = await Task.find();
    }
    catch (err) {
        console.log(err);
    }
    if (!tasks) {
        return res.status(404).json({ message: "No Tasks Found" });
    }
    return res.status(200).json({ tasks });
}

const getById = async (req, res, next) => {
    const id = req.params.id;
    let task;
    try {
        task = await Task.findById(id);
    }
    catch (err) { console.log(err) }
    if (!task) {
        return res.status(404).json({ message: "No Tasks Found" });
    }
    return res.status(200).json({ task });

}

const addTask = async (req, res, next) => {
    const { name, description, status } = req.body;
    let task;
    try {
        task = new Task({ name, description, status });
        await task.save();
    } catch (err) {
        console.log(err);
    } if (!task) {
        return res.status(404).json({ message: "Unable to add" });
    }
    return res.status(201).json(await Task.find());
}

const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const { name, description, status } = req.body;
    let task;
    try {
        task = new Task.findByIdAndUpdate(id, { name, description, status });
        task = await task.save();
    } catch (err) {
        console.log(err);
    } if (!task) {
        return res.status(404).json({ message: "Unable to update by this Id" });
    }
    return res.status(200).json({ task });
}

const deleteTask = async (req, res, next) => {
    const id = req.params.id;
    let task;
    try {
        task = await Task.findByIdAndRemove(id);

    } catch (err) {
        console.log(err);
    } if (!task) {
        return res.status(404).json({ message: "Unable to delete by this Id" });
    }
    return res.status(200).json({ message: "Task successfully deleted" });
}


exports.getAllTasks = getAllTasks;
exports.addTask = addTask;
exports.getById = getById;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;