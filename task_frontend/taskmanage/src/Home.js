import React, { useEffect, useState } from "react";
import BottonComp from "./BottonComp";
import UpdateTaskModal from "./UpdateTaskModal"; // Import the new modal component
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // To track the task being updated

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

  const handleUpdate = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateClose = () => {
    setSelectedTask(null);
  };
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

      {/* Render the UpdateTaskModal */}
      {selectedTask && (
        <UpdateTaskModal
          task={selectedTask}
          onUpdate={(updatedTask) => {
            // Handle task update
            const token = localStorage.getItem("token");
            const headers = {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            };

            axios
              .put(`/api/task/update/${updatedTask._id}`, updatedTask, { headers })
              .then((response) => {
                // Update the state with the updated task
                setTasks((prevTasks) =>
                  prevTasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                  )
                );

                // Close the modal
                handleUpdateClose();
              })
              .catch((error) => {
                console.error("Error updating task:", error);
              });
          }}
          onClose={handleUpdateClose}
        />
      )}
    </>
  );
};

export default Home;
