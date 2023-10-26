import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";


const Landing = ()=>{
    return (
        <>
         <h1 className="landHeading">Welcome to Task Manager</h1>
         <div className="btnsigninup">
            <Link to="/signin" style={{ textDecoration: 'none' }} className="button_land"> Sign In
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }} className="button_land"> Sign Up
            </Link>
         </div>
        </>
    );
}

export default Landing;