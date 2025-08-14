import { Link } from "react-router-dom";
import { useFollow } from "../context/FollowContext";

export default function UserCard({ user }) {
    const { isFollowing, follow, unfollow } = useFollow();
    const following = isFollowing(user.id);

    return (
        <div className="card">
            <h3 style={{ margin: 0 }}>{user.name}</h3>
            <div className="meta">@{user.username}</div>
            <div className="kv"><b>Email:</b> <span className="meta">{user.email}</span></div>
            <div className="kv"><b>City:</b> <span className="meta">{user.address?.city}</span></div>
            <hr />
            <div className="row" style={{ justifyContent: "space-between" }}>
                <Link to={`/users/${user.id}`} className="button brand">View Profile</Link>
                {following ? (
                    <button className="button ghost" onClick={() => unfollow(user.id)}>Unfollow</button>
                ) : (
                    <button className="button" onClick={() => follow(user)}>Follow</button>
                )}
            </div>
        </div>
    );
}
