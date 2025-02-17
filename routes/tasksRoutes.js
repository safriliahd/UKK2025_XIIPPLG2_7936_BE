const express = require('express');
const { getTasks, addTasks, editTask, deleteTasks, completeTask, undoTask, getTaskByCategoryId } = require('../controllers/tasksController');

const router = express.Router();
router.get('/', getTasks);
router.get('/category/:categoryId', getTaskByCategoryId);
router.post('/add', addTasks);
router.put('/:id', editTask);
router.delete('/:id', deleteTasks);
router.patch('/:id/complete', completeTask),
router.patch('/:id/undo', undoTask);

module.exports = router;