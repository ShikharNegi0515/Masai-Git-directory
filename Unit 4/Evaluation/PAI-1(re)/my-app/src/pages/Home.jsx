import { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import UserList from "../components/UserList";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        fetchUsers()
            .then(data => { if (!ignore) setUsers(data); })
            .catch(() => setError("Failed to load users"))
            .finally(() => setLoading(false));
        return () => { ignore = true; };
    }, []);

    const filtered = users.filter(u =>
        [u.name, u.username, u.email].some(x =>
            String(x).toLowerCase().includes(q.toLowerCase())
        )
    );

    return (
        <>
            <div className="row" style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
                <h2 style={{ margin: 0 }}>Users</h2>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name, username, email…"
                    style={{
                        background: "var(--card)", color: "var(--text)", border: "1px solid var(--border)",
                        padding: ".6rem .75rem", borderRadius: "10px", width: "min(380px, 60vw)"
                    }}
                />
            </div>

            {loading && <div className="loading">Loading users…</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && <UserList users={filtered} />}
        </>
    );
}
