import { useFollow } from "../context/FollowContext";
import UserList from "../components/UserList";

export default function Following() {
    const { following } = useFollow();

    return (
        <>
            <h2>Following</h2>
            {following.length ? (
                <UserList users={following} />
            ) : (
                <div className="empty">You’re not following anyone yet.</div>
            )}
        </>
    );
}
