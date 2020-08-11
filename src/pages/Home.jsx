import React from 'react'
import { GoogleLogout } from "react-google-login";
import { logOutUser } from '../redux/actions/googleAuthActions'


import config from "../config";
import { Redirect } from 'react-router-dom';

const Home = () => {
    const handleLogoutFailure = err => {
        console.error(err);
      };
    
      const handleLogoutSuccess = () => {
      
       
       
        alert("Logged out successfully");
        logOutUser();
        return <Redirect to="/Login"/>
       
       
        
      };
    return (
        <div>
               <GoogleLogout
              clientId={config.CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogoutSuccess}
              onFailure={handleLogoutFailure}
            />
           
        </div>
  
    )
}

export default Home
