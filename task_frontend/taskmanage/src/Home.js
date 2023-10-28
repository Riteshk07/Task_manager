import React, { useEffect, useState } from "react";
import BottonComp from "./BottonComp";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [updatedTask, setUpdatedTask] = useState({}); // To store the updated task

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: value,
    });
  };

  const handleUpdate = (task) => {
    setUpdatedTask({ ...task });
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedId = updatedTask._id;

      // Send the updated task to the backend
      await axios.put(`/api/task/update/${updatedId}`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Find the task in the tasks array and update it
      const updatedTasks = tasks.map((task) =>
        task._id === updatedId ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  useEffect(() => {
    // Fetch all tasks when the component mounts
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("/api/task/all", { headers })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);



  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/task/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh tasks after delete
      const updatedTasks = tasks.filter(task => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <>
      <div className="container d-flex mt-4">
        <h2>Welcome to Task Management</h2>
      </div>
      <div className="container">
        <BottonComp />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Start Date</th>
            <th scope="col">Deadline</th>
            <th scope="col">Status</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <th scope="row">{index + 1}</th>
              <td>{task.task}</td>
              <td>{task.startdate}</td>
              <td>{task.deadline}</td>
              <td>{task.status}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(task)}
                  data-bs-toggle="modal" 
                  data-bs-target={`#model${task._id}`}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {tasks.map((task) => (
        <div
            key={task._id}
            className="modal fade"
            id={`modal${task._id}`}
            tabIndex="-1"
            aria-labelledby={`modalLabel${task._id}`}
            aria-hidden="true"
            >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`modalLabel${task._id}`}>
                    Update Task
                    </h1>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <form>
                    <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="abouttask" className="form-label">
                        About Task
                        </label>
                        <textarea
                        className="form-control"
                        name="task"
                        id="abouttask"
                        rows="3"
                        value={updatedTask.task}
                        onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startdate" className="form-label">
                        Start Date
                        </label>
                        <input
                        type="date"
                        name="startdate"
                        className="form-control"
                        id="startdate"
                        value={updatedTask.startdate}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">
                        Deadline
                        </label>
                        <input
                        type="date"
                        name="deadline"
                        className="form-control"
                        id="deadline"
                        value={updatedTask.deadline}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                        Status
                        </label>
                        <select
                        name="status"
                        id="status"
                        className="form-control"
                        value={updatedTask.status}
                        onChange={handleInputChange}
                        >
                        <option value="in_process">Under Process</option>
                        <option value="completed">Completed</option>
                        </select>
                    </div>
                    </div>
                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateTask}
                    >
                        Update
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        ))}
    </>
  );
};

export default Home;
