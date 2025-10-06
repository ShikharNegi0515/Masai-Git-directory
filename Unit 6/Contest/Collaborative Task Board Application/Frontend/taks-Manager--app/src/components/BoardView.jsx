import { useEffect, useState } from "react";
import Column from "./Column";
import { getBoards } from "../api/board";

export default function BoardView({ boardId }) {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const fetchBoard = async () => {
            const res = await getBoards();
            setBoard(res.data.find(b => b._id === boardId));
        };
        fetchBoard();
    }, [boardId]);

    if (!board) return <div>Loading...</div>;

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            {board.columns.map(col => (
                <Column key={col._id} column={col} boardId={board._id} />
            ))}
        </div>
    );
}
