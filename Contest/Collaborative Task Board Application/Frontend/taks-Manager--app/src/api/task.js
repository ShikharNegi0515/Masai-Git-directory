import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/tasks" });
const token = localStorage.getItem("token");
API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const createTask = (data) => API.post("/", data);
export const updateTask = (taskId, data) => API.patch(`/${taskId}`, data);
export const deleteTask = (data) => API.delete("/", { data });
export const moveTask = (data) => API.patch("/move", data);
export const getTasksByColumn = (boardId, columnId) => API.get(`/${boardId}/${columnId}`);
