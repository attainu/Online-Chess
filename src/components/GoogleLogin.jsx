import React from 'react'
import config from './../config'
import { Redirect } from 'react-router-dom'

const GoogleLogin = ({user,setUser}) => {
    const responseGoogle = response => {
        if(response.error){
            console.error(response.error)
        }
        console.log(response)
        setUser({...response.profileObj, ...response.tokenObj })

    };
    // if(user) return <Redirect to="/" />;
    return (
        <div>

                  <GoogleLogin
    clientId={config.CLIENT_ID}
    buttonText="Login"
    isSignedIn={true}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    scope="https://www.googleapis.com/auth/youtube"
    cookiePolicy={'single_host_origin'}
  />
  
        </div>
    )
}

export default GoogleLogin
