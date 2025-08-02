import { createContext, useContext, useEffect, useRef, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setNotifications(prev => [
                ...prev,
                {
                    id: Date.now(),
                    message: "🔔 You have a new message!",
                    read: false,
                },
            ]);
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const stopNotifications = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            markAllAsRead,
            stopNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
