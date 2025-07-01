import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggleAuth = () => setIsLoggedIn((prev) => !prev);

    return (
        <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
