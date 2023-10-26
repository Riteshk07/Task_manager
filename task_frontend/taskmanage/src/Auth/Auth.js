import React from "react";
import { useParams } from "react-router-dom";
import Signup from "./Componant/Signup.js";
import Signin from "./Componant/Signin.js";
import "./css/auth.css";

const Auth = ({setLoggedIn})=>{
    let signComponant;
    const { section } = useParams();
    
    

    switch(section){
        case 'signin':
            signComponant = <Signin setLoggedIn= {setLoggedIn}/>
            break;
        case 'signup':
            signComponant = <Signup setLoggedIn= {setLoggedIn}/>
            break;
        default:
            signComponant = <div>No Content Available</div>
    }

    return (
        <>
        <div className="authbody">
        {signComponant}
        </div>
        </>
    );


}

export default Auth;