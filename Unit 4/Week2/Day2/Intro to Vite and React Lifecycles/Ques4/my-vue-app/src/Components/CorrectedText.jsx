import React from 'react';

const CorrectedText = ({ text, corrections }) => {
    let correctionCount = 0;

    const correctedWords = text.split(" ").map(word => {
        const corrected = corrections[word.toLowerCase()];
        if (corrected) {
            correctionCount++;
            return corrected;
        }
        return word;
    });

    return (
        <div>
            <p>{correctedWords.join(" ")}</p>
            <p style={{ color: "gray", fontSize: "0.9rem" }}>
                Corrections made: {correctionCount}
            </p>
        </div>
    );
};

export default CorrectedText;
