import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Footer = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <footer style={{ marginTop: "2rem", borderTop: "1px solid gray", paddingTop: "1rem" }}>
            <p>{isLoggedIn ? "Welcome, User" : "Please log in"}</p>
        </footer>
    );
};

export default Footer;
