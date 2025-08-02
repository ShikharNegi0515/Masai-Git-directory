import { useNotifications } from '../context/NotificationContext';

export default function NotificationList() {
    const { notifications } = useNotifications();

    if (notifications.length === 0) {
        return <p>No notifications yet.</p>;
    }

    return (
        <ul className="notification-list">
            {notifications.map(n => (
                <li key={n.id} className={n.read ? 'read' : 'unread'}>
                    {n.message}
                </li>
            ))}
        </ul>
    );
}
