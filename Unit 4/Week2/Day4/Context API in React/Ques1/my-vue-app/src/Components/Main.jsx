import React from "react";
import MainRight from "./MainRight";

const Main = ({ userName }) => {
    return (
        <div style={{ marginTop: "1rem", border: "1px solid gray", padding: "1rem" }}>
            <h2>Main Component</h2>
            <MainRight userName={userName} />
        </div>
    );
};

export default Main;
