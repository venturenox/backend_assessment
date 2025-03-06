const express = require('express');
const { publishEvent } = require('./producer');

const app = express();
app.use(express.json());

let tasks = [];

app.post('/tasks', async (req, res) => {
    const task = { id: tasks.length + 1, ...req.body };
    tasks.push(task);
    await publishEvent('task_created', task);
    res.status(201).json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    await publishEvent('task_updated', tasks[taskIndex]);
    res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await publishEvent('task_deleted', deletedTask);
    res.json(deletedTask);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`TodoList Service running on port ${PORT}`));