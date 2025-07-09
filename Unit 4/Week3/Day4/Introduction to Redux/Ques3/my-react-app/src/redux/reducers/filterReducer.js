import { SET_FILTER } from "../actions";

const initialFilter = {
    author: "",
    genre: "",
    status: "all", 
};

export const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case SET_FILTER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
