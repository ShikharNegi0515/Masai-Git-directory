import React from "react";

function ButtonTwo({ setCount }) {
    return (
        <>
            <button onClick={() => { setCount(prev => prev - 1) }} >Decrement</button>
        </>
    )
}

export default ButtonTwo