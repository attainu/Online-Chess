import { combineReducers } from "redux";

//ALL REDUCERS
import authReducer from "../redux/reducers/authReducer";
import googleAuthReducer from "../redux/reducers/googleauthReducer";
import chessReducer from "./reducers/chessReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  googleAuthState: googleAuthReducer,
  chessState: chessReducer,
});

export default rootReducer;
