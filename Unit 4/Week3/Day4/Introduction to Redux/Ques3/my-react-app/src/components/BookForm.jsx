import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/actions";

const BookForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.author && formData.genre) {
            dispatch(addBook(formData));
            setFormData({ title: "", author: "", genre: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <input
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                required
            />
            <input
                name="genre"
                placeholder="Genre"
                value={formData.genre}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;
