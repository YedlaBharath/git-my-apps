import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import {ItemReducer} from './ItemsReducer'

export const reducers = combineReducers({
  userReducer
});
