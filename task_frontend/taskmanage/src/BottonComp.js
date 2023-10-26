import React from "react";
import "./buttoncmp.css"

const BottonComp = ()=>{


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
                <form>
                    <div className="modal-body">
                    <div className="mb-3">
                        <label for="abouttask" className="form-label">About Task</label>
                        <textarea className="form-control" name="task" id="abouttask" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                
                </div>
            </div>
            </div>
        </>
    );
}

export default BottonComp;