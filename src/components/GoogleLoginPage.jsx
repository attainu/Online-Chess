import React from 'react'
import config from '../config'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login';
import { googleSetUser } from '../redux/actions/googleAuthActions'
import { useHistory } from "react-router-dom";

const GoogleLoginPage = ({user,googleSetUser}) => {
    const history = useHistory();
    const responseGoogle = response => {
        if(response.error){
            console.error(response.error)
        }
        
        let path = `/`; 
        history.push(path);
        console.log(response)
        googleSetUser({ ...response.profileObj, ...response.tokenObj });
       

    };

    return (
        <div>

                  <GoogleLogin
    clientId={config.CLIENT_ID}
    buttonText="Login"
    isSignedIn={false}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    scope="https://www.googleapis.com/auth/youtube"
    cookiePolicy={'single_host_origin'}
  />
  
        </div>
    )
}
// const mapStateToProps = storeState => {
//     console.log(storeState.googleAuthState.user)
  
//     return {
//         user: storeState.googleAuthState.user
//     }
//   }
const mapStateToProps = storeState => {
    return {
      user: storeState.googleAuthState.user
    };
  };
  
 export default connect(mapStateToProps,{ googleSetUser })(GoogleLoginPage)
