import React, { useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
// import axios from 'axios';


const Dashboard = ({ loggedIn, setLoggedIn, userDetails, usrId }) => {
    const navigate = useNavigate();
    const { section } = useParams();
    const currPath = window.location.pathname==="/";
    
    
    useEffect(() => {
        if(loggedIn === false){
            navigate("/signin");
        }
        if (currPath) {
            navigate("/home");
        }
    }, [currPath, navigate, loggedIn]);

    // Fetch user details after the user logs in


    let contentComponent;

    switch (section) {
        
        case 'home':
            contentComponent = <Home />;
            break;
        default:
            contentComponent = <div>No content available</div>;
    }
    // console.log("Selected Section:", section); // Add this line to check selected section
    // console.log("Content Component:", contentComponent); // Add this line to check selected content component

    

    

    return (
        <>
            {loggedIn ? (
                <div>
                     <Navbar
                        setLoggedIn = {setLoggedIn}
                        userDetails = {userDetails}
                    />
            
                    <section className="dashboard">
                    
            
                    <div className="dash-content">
                        {/* ... Dashboard content ... */}
                        {contentComponent}
                    </div>
                    </section>
                    
                </div>
            ): (
                // Render a placeholder until the user logs in
                <div className='isuserlogout'>Please log in...</div>
            )}
        </>
    );
};

export default Dashboard;
