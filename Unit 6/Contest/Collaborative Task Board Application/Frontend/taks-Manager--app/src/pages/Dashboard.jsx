import { useState, useEffect, useContext } from "react";
import { getBoards, createBoard, deleteBoard } from "../api/board";
import { AuthContext } from "../context/AuthContext";
import BoardList from "../components/BoardList";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [boards, setBoards] = useState([]);
    const [title, setTitle] = useState("");

    const fetchBoards = async () => {
        const res = await getBoards();
        setBoards(res.data);
    };

    useEffect(() => { fetchBoards(); }, []);

    const handleCreateBoard = async () => {
        if (!title) return;
        const res = await createBoard({ title, columns: ["Todo", "In Progress", "Done"] });
        setBoards([...boards, res.data]);
        setTitle("");
    };

    const handleDeleteBoard = async (boardId) => {
        await deleteBoard(boardId);
        setBoards(boards.filter(b => b._id !== boardId));
    };

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <input placeholder="Board title" value={title} onChange={e => setTitle(e.target.value)} />
            <button onClick={handleCreateBoard}>Create Board</button>
            <BoardList boards={boards} onDelete={handleDeleteBoard} />
        </div>
    );
}
