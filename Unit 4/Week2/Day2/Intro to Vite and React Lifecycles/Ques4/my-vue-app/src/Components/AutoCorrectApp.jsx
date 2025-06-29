import React, { useState } from 'react';
import CorrectedText from './CorrectedText';

const corrections = {
    teh: "the",
    recieve: "receive",
    adress: "address",
    wierd: "weird",
    thier: "their"
};

const AutoCorrectApp = () => {
    const [inputText, setInputText] = useState("");

    return (
        <div style={styles.container}>
            <h2>AutoCorrect App</h2>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type something with typos..."
                style={styles.input}
            />
            <div style={styles.output}>
                <strong>Corrected:</strong>
                <CorrectedText text={inputText} corrections={corrections} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fefefe"
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        marginBottom: "20px"
    },
    output: {
        fontSize: "1.1rem",
        color: "#333"
    }
};

export default AutoCorrectApp;
