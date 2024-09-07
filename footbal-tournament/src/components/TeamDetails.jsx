import React, {useState} from "react";
import PlayerInfo from "./PlayerInfo";

const TeamDetails = ({team}) => {
    const [searchTerm, setSearchTerm]=useState('');
    const[filterPosition, setFilterPosition]=useState('');

    const filteredPlayers =team.players.filter(player => {
        const matchesSearch = player.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = filterPosition === '' || player.position === filterPosition;
        return matchesSearch && matchesPosition;

    });

    return (
        <div className="team-details">
            <div className="team-info">
                <h1>{team.name}</h1>
                <p>Manager:{team.managerFullName}</p>
            </div>

            <div className="search-filter">
                <input
                type="text"
                placeholder="Search player by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) =>setFilterPosition(e.target.value)}>
                    <option value="">All Positions</option>
                    <option value="GK">GoalKeeper</option>
                    <option value="DF">Defender</option>
                    <option value="MF">Midfielder</option>
                    <option value="FW">Forward</option>
                  
                </select>
                </div>

                <div className="roster">
                    <h2>Roster</h2>
                    <div className="player-list">
                        {filteredPlayers.length > 0 ? (
                            filteredPlayers.map(player => (
                                <PlayerInfo key={player.id} player={player}/>

                            ))
                        ) : (

                            <p>No players found</p>
                        )}
                        </div>
                        </div>
                        </div>


    );
};

export default TeamDetails;