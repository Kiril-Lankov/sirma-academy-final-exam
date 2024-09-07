import React from 'react';

//import TeamFormation from './TeamFormation';

const MatchDetails = ({ match, teamA, teamB }) => {
  return (
    <div className="match-details">
      <h1>{teamA.name} {match.score} {teamB.name}</h1>
      <p>Date: {match.date}</p>

    </div>
  );
};

export default MatchDetails;