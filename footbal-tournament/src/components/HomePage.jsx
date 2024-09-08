import React from 'react';

function MatchBracket ({ props }) {
    
    return (
  <div className="match-card">
    <p>{match.teamA} vs {props.match.teamB}</p>
    <p>Date: {props.match.date}</p>
    <p>Score: {props.match.score}</p>
  </div>
    )
};

export default MatchBracket;