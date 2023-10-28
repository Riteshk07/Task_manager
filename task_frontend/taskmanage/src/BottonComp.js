import React from "react";
import "./buttoncmp.css";
import axios from "axios";
import { useState } from "react";

const BottonComp = ()=>{
    const [formData, setFormData] = useState({
        task: "",
        startdate: "",
        deadline: "",
        status: "in_process", // Default status
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        // Configure headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        axios.post('/api/task/create', formData, { headers })
          .then(response => {
            // Handle a successful response, e.g., show a success message or redirect
            console.log('Task created:', response.data);
            // Reset the form or perform other actions as needed
            setFormData({
              task: '',
              startdate: '',
              deadline: '',
              status: 'in_process',
            });
          })
          .catch(error => {
            // Handle errors, e.g., show an error message
            console.error('Error creating task:', error);
          });
      };

    return (
        <>
            <button class="c-button mx-5" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <span class="c-main">
                    <span class="c-ico"><span class="c-blur"></span> <span class="ico-text">+</span></span>
                    Add Task
                </span>
            </button>
            

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    value={formData.task}
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
                    onChange={handleChange}
                    value={formData.startdate}
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
                    onChange={handleChange}
                    value={formData.deadline}
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
                    onChange={handleChange}
                    value={formData.status}
                  >
                    <option value="in_process">Under Process</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
                
                </div>
            </div>
            </div>
        </>
    );
}

export default BottonComp;