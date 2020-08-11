import { GOOGLE_LOGIN, TOGGLE_AUTH_STATE,GOOGLE_LOGOUT} from '../actionTypes'

const initialstate =   {
  user : JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticating : false
};


const GoogleReducer =(state = initialstate, action) =>{
    const {type, payload } = action
    switch( type){
        case GOOGLE_LOGIN :
            const userJSON=JSON.stringify(payload);
            localStorage.setItem('user',userJSON);
             return { ...state, user: payload};
         case TOGGLE_AUTH_STATE:   return{...state, isAuthenticating : !state.isAuthenticating }
         case GOOGLE_LOGOUT :
             localStorage.removeItem('user')
             return { ...state, user: null }
                default : 
                return state;
    }

    }

    export default GoogleReducer ;
