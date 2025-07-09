import { createStore, applyMiddleware, combineReducers } from "redux";
import matchReducer from "./match/matchReducer";

const store = createStore(matchReducer);

export default store;
