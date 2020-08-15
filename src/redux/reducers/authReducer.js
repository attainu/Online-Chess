const initialstate = {
  user: null,
};

const authReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload
      }
    case "PASSWORD_RESET":
      break;
    default:
      return state;
  }
};

export default authReducer;
