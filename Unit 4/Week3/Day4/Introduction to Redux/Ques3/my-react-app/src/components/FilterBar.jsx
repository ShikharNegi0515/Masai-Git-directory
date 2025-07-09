import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/actions";

const FilterBar = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setFilter({ [e.target.name]: e.target.value }));
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <input name="author" placeholder="Filter by Author" onChange={handleChange} />
            <input name="genre" placeholder="Filter by Genre" onChange={handleChange} />
            <select name="status" onChange={handleChange}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </div>
    );
};

export default FilterBar;
