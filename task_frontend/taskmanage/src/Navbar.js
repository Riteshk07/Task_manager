import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
const Navbar = ({setLoggedIn, userDetails})=>{
    const navigate = useNavigate()
    console.log(userDetails.name);
    const handleLogout = () => {
        // Clear JWT token from localStorage
        localStorage.removeItem('token'); // Assuming you store the authentication token
        localStorage.removeItem('mode'); // Clear any dark mode setting
        localStorage.removeItem('status'); // Clear any sidebar status setting
        // Update the logged-in state
        setLoggedIn(false);
        // Redirect to sign-in page after logging out
        navigate("/");
        window.location.reload(); // Reload the application
    };
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                
                <NavLink className="navbar-brand" activeClassName="active" to="#">Task Management</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-link" activeClassName="active" aria-current="page" to="/home">Home</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="#">Remaining</NavLink>
                    <NavLink className="nav-link" activeClassName="active" to="#">Completed</NavLink>
                </div>
                </div>
                <div class="d-flex">
                    <h4 className="mx-3">{userDetails.name}</h4>
                    <button class="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
        </nav>
        </>
    )
}

export default Navbar;