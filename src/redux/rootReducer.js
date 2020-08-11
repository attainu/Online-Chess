import { combineReducers } from  'redux'

//ALL REDUCERS
import authReducer from '../redux/reducers/authReducer';
import googleAuthReducer  from '../redux/reducers/googleauthReducer'



const rootReducer =combineReducers({

 
    authState : authReducer,
    googleAuthState : googleAuthReducer
  

})


 export default rootReducer;