import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, fetchPostsByUser } from "../api";
import { useFollow } from "../context/FollowContext";

export default function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [error, setError] = useState("");
    const { isFollowing, follow, unfollow } = useFollow();

    useEffect(() => {
        let ignore = false;
        setLoadingUser(true);
        setError("");
        fetchUser(userId)
            .then(data => { if (!ignore) setUser(data); })
            .catch(() => setError("Failed to load user"))
            .finally(() => setLoadingUser(false));
        return () => { ignore = true; };
    }, [userId]);

    useEffect(() => {
        let ignore = false;
        setLoadingPosts(true);
        fetchPostsByUser(userId)
            .then(data => { if (!ignore) setPosts(data); })
            .catch(() => { }) // keep silent if posts fail
            .finally(() => setLoadingPosts(false));
        return () => { ignore = true; };
    }, [userId]);

    if (loadingUser) return <div className="loading">Loading profile…</div>;
    if (error || !user) return <div className="error">{error || "User not found."}</div>;

    const following = isFollowing(user.id);

    return (
        <div className="card">
            <div className="row" style={{ justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>{user.name} <span className="meta">(@{user.username})</span></h2>
                {following ? (
                    <button className="button ghost" onClick={() => unfollow(user.id)}>Unfollow</button>
                ) : (
                    <button className="button" onClick={() => follow(user)}>Follow</button>
                )}
            </div>

            <div className="kv"><b>Email:</b> <span className="meta">{user.email}</span></div>
            <div className="kv"><b>Phone:</b> <span className="meta">{user.phone}</span></div>
            <div className="kv"><b>Website:</b> <span className="meta">{user.website}</span></div>

            <h3>Address</h3>
            <div className="meta">
                {user.address?.suite}, {user.address?.street}, {user.address?.city} — {user.address?.zipcode}
            </div>

            <h3 style={{ marginTop: "1rem" }}>Company</h3>
            <div className="meta">{user.company?.name} — {user.company?.catchPhrase}</div>

            <hr />
            <h3>Posts</h3>
            {loadingPosts ? (
                <div className="loading">Loading posts…</div>
            ) : posts.length ? (
                <ul className="list">
                    {posts.map(p => (
                        <li key={p.id}>
                            <b>{p.title}</b>
                            <div className="meta">{p.body}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">No posts found for this user.</div>
            )}
        </div>
    );
}
