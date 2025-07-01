import React from "react";

const BottomMainRight = ({ userName }) => {
    return (
        <div style={{ marginTop: "1rem", border: "1px dashed gray", padding: "1rem" }}>
            <h4>BottomMainRight Component</h4>
            <p><strong>Name from props:</strong> {userName || "No name entered"}</p>
        </div>
    );
};

export default BottomMainRight;
