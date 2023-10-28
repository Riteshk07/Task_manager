import React, { useState } from "react";

const UpdateTaskModal = ({ task, onUpdate, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className="modal fade" id="updateTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Task
            </h1>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
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
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
