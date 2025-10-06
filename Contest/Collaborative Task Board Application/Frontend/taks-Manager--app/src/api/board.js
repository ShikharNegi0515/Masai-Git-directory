import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/boards" });

const token = localStorage.getItem("token");
API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getBoards = () => API.get("/");
export const createBoard = (data) => API.post("/", data);
export const deleteBoard = (boardId) => API.delete(`/${boardId}`);
export const inviteMember = (boardId, email) => API.post(`/${boardId}/invite`, { email });
