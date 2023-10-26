import TaskModel from '../models/Task.js'; // Import the Task model

const taskController = {
  createTask: async (req, res) => {
    try {
      const { task, startdate, deadline, status } = req.body;
      const newTask = new TaskModel({
        task,
        startdate,
        deadline,
        status,
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.find();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
  },

  getCompletedTasks: async (req, res) => {
    try {
      const completedTasks = await TaskModel.find({ status: 'completed' });
      res.json(completedTasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve completed tasks' });
    }
  },

  getRemainingTasks: async (req, res) => {
    try {
      const remainingTasks = await TaskModel.find({ status: 'remaining' });
      res.json(remainingTasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve remaining tasks' });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { task, startdate, deadline, status } = req.body;
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { task, startdate, deadline, status },
        { new: true }
      );
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      await TaskModel.findByIdAndRemove(id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  },
};

export default taskController;
