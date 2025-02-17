const prisma = require('../prismaClient')

exports.getTasks = async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
};

exports.getTaskByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const tasks = await prisma.task.findMany({
            where: { categoryId: Number(categoryId) },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch tasks for the given category', error: error.message});
    }
};

exports.addTasks = async (req, res) => {
    try {
        const { task, categoryId, userId, date } = req.body;

        const newTask = await prisma.task.create({
            data: {
                task,
                categoryId: Number(categoryId),
                userId: Number(userId),
                date: new Date(),
            }
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add task', error: error.message});
    }
};

exports.editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;
        const updateTask = await prisma.task.update({
            where: { id: Number(id) }, data: {task} 
        });
        res.json(updateTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to edit task', error: error.message});
    }

};

exports.deleteTasks = async (req, res) => {
    const { id } = req.params;

    try {
        const existingTask = await prisma.task.findUnique({
            where: { id: Number(id) }
        });

        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found'});
        }

        await prisma.task.delete({
            where: { id: Number(id)}
        });
        res.json({message: 'Task deleted sucsessfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};

exports.completeTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await prisma.task.update({ where: { id: Number(id) }, data: { status: 'COMPLETE' } });
    res.json(updatedTask);
};

exports.undoTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await prisma.task.update({ where: { id: Number(id) }, data: { status: 'NOT_COMPLETE' } });
    res.json(updatedTask);
};