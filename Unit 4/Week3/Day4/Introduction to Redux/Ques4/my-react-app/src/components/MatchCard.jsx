import React from "react";

const MatchCard = ({ match }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <p><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></p>
            <p>Date: {match.date}</p>
            <p>Match Winner: {match.match_winner}</p>
            <p>Venue: {match.venue}</p>
        </div>
    );
};

export default MatchCard;
