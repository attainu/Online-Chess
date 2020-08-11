const action = {}

action.register = (userDetails) => {
    return (dispatch) => {
        //sync action
        dispatch({type: 'REGISTER', payload: userDetails})
    }
}

action.login = (userCreds, userArray) => {
    let {email, password} = userCreds;
    const user = userArray.find(userObj => userObj.email === email && userObj.password === password)
    if (user) {
        let {email, fullname} = user;
        return {type: 'LOGIN', payload: {email, fullname, isAuthenticated: true}}
    }
    return {type: 'LOGIN', payload: {email: '', fullname:'', isAuthenticated: false}}
}

export const {register, login} = action;