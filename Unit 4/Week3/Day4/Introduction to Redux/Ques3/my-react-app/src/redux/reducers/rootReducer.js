import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer";
import { filterReducer } from "./filterReducer";

export const rootReducer = combineReducers({
    books: booksReducer,
    filters: filterReducer,
});
