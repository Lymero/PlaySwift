import { combineReducers, createStore } from "redux";
import usersSession from "./users_session";

const rootReducers = combineReducers({ usersSession });
export default createStore(rootReducers);
