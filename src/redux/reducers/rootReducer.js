import { combineReducers } from "redux";

//ALL REDUCERS
import authReducer from "./authReducer";
import chessReducer from "./chessReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  chessState: chessReducer,
});

export default rootReducer;
