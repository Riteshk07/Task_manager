import express from 'express';
import taskController from '../controllers/taskController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

const router = express.Router();

// Protect these routes with authentication middleware
router.use(checkUserAuth);

router.post('/create', taskController.createTask); // Create a new task
router.get('/all', taskController.getAllTasks); // Get all tasks
router.get('/completed', taskController.getCompletedTasks); // Get completed tasks
router.get('/remaining', taskController.getRemainingTasks); // Get remaining tasks
router.put('/update/:id', taskController.updateTask); // Update a task
router.delete('/delete/:id', taskController.deleteTask); // Delete a task

export default router;
