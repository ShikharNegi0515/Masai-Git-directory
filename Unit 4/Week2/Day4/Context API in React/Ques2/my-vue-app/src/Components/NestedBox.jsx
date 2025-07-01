import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const NestedBox = () => {
    const { theme } = useContext(ThemeContext);

    const boxStyle = {
        padding: "1rem",
        marginTop: "1rem",
        backgroundColor: theme === "light" ? "#fff" : "#444",
        color: theme === "light" ? "#000" : "#fff",
        border: "1px solid",
        borderColor: theme === "light" ? "#ccc" : "#666",
        borderRadius: "8px"
    };

    return <div style={boxStyle}>This box adapts to the {theme} theme!</div>;
};

export default NestedBox;
