const express = require("express");
const router = express.Router();

const Task = require("../models/task");
// GET /tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.json(tasks);} 
        catch (error) {
        res.status(500).json(
            {message: "Failed to fetch tasks"});
    }
});

// POST /tasks
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "")
            {
            return res.status(400).json({
                message: "Task title is required"});
        }

        const newTask = new Task({
            title: title.trim()});

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);}
         catch (error) 
         {
        res.status(500).json(
            {message: "Failed to create task"});
    }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});


module.exports = router;