import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { teamReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  //changes here
  auth: authReducer,
  team: teamReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
