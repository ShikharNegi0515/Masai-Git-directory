import React, { useRef, useState } from "react";

export default function FocusInput() {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = "#FEF9C3";
        setFocused(true);
    };

    return (
        <div className="focus-container">
            <input
                ref={inputRef}
                type="text"
                placeholder="Click the button to focus me"
                className="focus-input"
            />
            <button onClick={handleFocus} className="focus-button">
                Focus Input
            </button>
            {focused && <p className="focus-message">Focused!</p>}
        </div>
    );
}
