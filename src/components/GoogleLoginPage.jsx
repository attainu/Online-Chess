import React from 'react'
import config from '../config'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login';
import { googleSetUser } from '../redux/actions/googleAuthActions'

const GoogleLoginPage = ({user,setUser}) => {
    const responseGoogle = response => {
        if(response.error){
            console.error(response.error)
        }
        console.log(response)
       

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
const mapStateToProps = storeState => {
    console.log(storeState.googleAuthState.user)
  
    return {
        user: storeState.googleAuthState.user
    }
  }
  
 export default connect(mapStateToProps,{ googleSetUser })(GoogleLoginPage)
