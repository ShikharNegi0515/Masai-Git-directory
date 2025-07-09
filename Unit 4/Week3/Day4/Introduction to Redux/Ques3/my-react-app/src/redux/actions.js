export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const TOGGLE_READ = "TOGGLE_READ";
export const SET_FILTER = "SET_FILTER";

export const addBook = (book) => ({ type: ADD_BOOK, payload: book });
export const deleteBook = (id) => ({ type: DELETE_BOOK, payload: id });
export const updateBook = (book) => ({ type: UPDATE_BOOK, payload: book });
export const toggleRead = (id) => ({ type: TOGGLE_READ, payload: id });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
