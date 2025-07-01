import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
    const { isLoggedIn, toggleAuth } = useContext(AuthContext);

    return (
        <nav style={{ marginBottom: "1rem" }}>
            <button onClick={toggleAuth}>
                {isLoggedIn ? "Logout" : "Login"}
            </button>
        </nav>
    );
};

export default Navbar;
