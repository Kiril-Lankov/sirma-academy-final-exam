import React from "react";

const PlayerInfo = ({player}) => (
    <div className="player-info">
        <p><strong>{player.fullName}</strong></p>
        <p>Position:{player.position}</p>
        <p>Team Number:{player.teamnumber}</p>
    </div>

);

export default PlayerInfo;