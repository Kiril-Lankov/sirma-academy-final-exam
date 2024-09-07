import React from "react";

const MatchBracket = ({match}) => (
    <div className="match-bracket">
        <p>{match.teamA} vs {match.teamB}</p>
        <p>Date: {match.date}</p>
        <p>Score: {match.score}</p>
    </div>
);

export default MatchBracket;