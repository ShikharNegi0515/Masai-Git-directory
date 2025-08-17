import { useState } from "react";

export function useToggleItems(initialValue, initialPosition = 0) {
    const startIndex = initialPosition >= 0 && initialPosition < initialValue.length
            ? initialPosition
            : 0;

    const [index, setIndex] = useState(startIndex);

    const state = initialValue[index];

    const toggleState = () => {
        setIndex((prevIndex) => (prevIndex + 1) % initialValue.length);
    };

    return [state, toggleState];
}
