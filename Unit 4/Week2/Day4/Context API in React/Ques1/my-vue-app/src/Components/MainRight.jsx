import React from "react";
import BottomMainRight from "./BottomMainRight";

const MainRight = ({ userName }) => {
    return (
        <div style={{ marginTop: "1rem", border: "1px solid gray", padding: "1rem" }}>
            <h3>MainRight Component</h3>
            <BottomMainRight userName={userName} />
        </div>
    );
};

export default MainRight;
