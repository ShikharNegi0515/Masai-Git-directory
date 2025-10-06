import { Link } from "react-router-dom";

export default function BoardList({ boards, onDelete }) {
    return (
        <div>
            {boards.map(board => (
                <div key={board._id}>
                    <Link to={`/board/${board._id}`}>{board.title}</Link>
                    <button onClick={() => onDelete(board._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
