import axios from "axios";
import {
    FETCH_MATCHES_REQUEST,
    FETCH_MATCHES_SUCCESS,
    FETCH_MATCHES_FAILURE,
} from "./matchTypes";

export const fetchMatches = () => async (dispatch) => {
    dispatch({ type: FETCH_MATCHES_REQUEST });

    try {
        const response = await axios.get("https://jsonmock.hackerrank.com/api/football_matches?page=2");
        dispatch({ type: FETCH_MATCHES_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: FETCH_MATCHES_FAILURE });
    }
};
