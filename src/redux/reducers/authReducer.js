import { LOGIN, REGISTER } from '../actionTypes'

const initialstate =   {
    users: [],
    fullname: '',
    email: '',
    isAuthenticated: false
 
   
};


const UserReducer =(state = initialstate, action) =>{
    const {type, payload } = action
    let stateCopy = {...state}
 
    
    switch( type){
        case REGISTER :
            stateCopy.users = [...stateCopy.users, payload]
            console.log(stateCopy);
             return stateCopy

         case LOGIN :  
         let { fullname, email , isAuthenticated} = action.payload;
         stateCopy.fullname = fullname;
         stateCopy.email = email;
         stateCopy.isAuthenticated = isAuthenticated;
         console.log(stateCopy)
         return stateCopy;
     default:
         return stateCopy;
 }
        

    }

    export default UserReducer ;
