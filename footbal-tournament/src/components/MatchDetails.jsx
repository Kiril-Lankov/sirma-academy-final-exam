import React from 'react';

const PlayerInfo = ({ player }) => (
  <div className="player-card">
    <p><strong>{player.fullName}</strong></p>
    <p>Position: {player.position}</p>
    <p>Team Number: {player.teamNumber}</p>
  </div>
);

export default PlayerInfo;