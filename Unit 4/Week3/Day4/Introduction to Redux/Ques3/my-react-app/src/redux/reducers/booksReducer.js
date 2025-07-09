import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, TOGGLE_READ } from "../actions";

const initialState = [];

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return [...state, { ...action.payload, id: Date.now(), read: false }];
        case DELETE_BOOK:
            return state.filter((book) => book.id !== action.payload);
        case UPDATE_BOOK:
            return state.map((book) =>
                book.id === action.payload.id ? { ...book, ...action.payload } : book
            );
        case TOGGLE_READ:
            return state.map((book) =>
                book.id === action.payload ? { ...book, read: !book.read } : book
            );
        default:
            return state;
    }
};
