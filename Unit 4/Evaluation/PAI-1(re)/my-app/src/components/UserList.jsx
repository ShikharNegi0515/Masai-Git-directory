import UserCard from "./UserCard";

export default function UserList({ users }) {
    if (!users?.length) return <div className="empty">No users to display.</div>;
    return (
        <div className="grid">
            {users.map(u => <UserCard key={u.id} user={u} />)}
        </div>
    );
}
