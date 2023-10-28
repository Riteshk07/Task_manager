import express from 'express';
import taskController from '../controllers/taskController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

const router = express.Router();


router.post('/create',checkUserAuth, taskController.createTask); // Create a new task
router.get('/all',checkUserAuth, taskController.getAllTasks); // Get all tasks
router.get('/completed',checkUserAuth, taskController.getCompletedTasks); // Get completed tasks
router.get('/remaining',checkUserAuth, taskController.getRemainingTasks); // Get remaining tasks
router.put('/update/:id',checkUserAuth, taskController.updateTask); // Update a task
router.delete('/delete/:id',checkUserAuth, taskController.deleteTask); // Delete a task

export default router;
