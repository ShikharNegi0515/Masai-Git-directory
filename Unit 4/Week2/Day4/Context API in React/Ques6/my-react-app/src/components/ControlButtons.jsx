import { useNotifications } from '../context/NotificationContext';

export default function ControlButtons() {
    const { markAllAsRead, stopNotifications } = useNotifications();

    return (
        <div className="buttons">
            <button onClick={markAllAsRead}>✅ Mark All as Read</button>
            <button onClick={stopNotifications}>🛑 Stop Notifications</button>
        </div>
    );
}
