import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        name: 'Shikhar Negi',
        email: 'shikhar@example.com'
    });

    const updateUser = (newData) => {
        setUser(prev => ({ ...prev, ...newData }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
