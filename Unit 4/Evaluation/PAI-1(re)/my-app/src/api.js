import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = () => api.get("/users").then(r => r.data);
export const fetchUser = (id) => api.get(`/users/${id}`).then(r => r.data);

export const fetchPostsByUser = (userId) =>
    api.get(`/posts`, { params: { userId } }).then(r => r.data);
