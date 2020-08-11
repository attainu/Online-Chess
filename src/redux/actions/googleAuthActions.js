import { GOOGLE_LOGIN, TOGGLE_AUTH_STATE,GOOGLE_LOGOUT } from "../actionTypes"

export const googleSetUser = user => {
    return {
        type : GOOGLE_LOGIN,
        payload : user
    };
};

export const logOutUser = ()=> {
    return {
        type : GOOGLE_LOGOUT,
      
    };
};

export const ToggleIsAuthenticating = () => {
    return {
        type : TOGGLE_AUTH_STATE
       
    };
};

