import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCSV } from "../hooks/useCSV";

const PlayerDetails = () => {
    //get player ID from url
    const {playerId} = useParams();
    const navigate = useNavigate();
    const {data: players, loading: playersLoading} = useCSV("/data/players.csv");
    const {data: records, loading: recordsLoading} = useCSV("/data/records.csv");
    const {data: teams, loading: teamsLoading} = useCSV("/data/teams.csv");

    if (playersLoading || recordsLoading || teamsLoading)
        return <p>Loading player details...</p>;
    
    const playerInfo = players.find(player => player.ID === playerId);
    const playerTime = records.find(record => record.ID === playerId);

    if (!playerInfo || !playerTime ) 
        return <p>Player not found</p>

    return (
        <div className="player-details">
            <h2>Name: {playerInfo.FullName}</h2>
            
            <p>Position: {playerInfo.Position}</p>
            <p>Number:{playerInfo.TeamNumber}</p>
            <p>Played from Minute:{playerTime.fromMinutes}</p>
            <p>Played to Minute:{playerTime.toMinutes}</p>
            
            

            <button className="back-button" onClick={() => navigate("/")}>
                Home Page
                </button>

                <button className="back-button" onClick={() => navigate(-1)}>
                    Back to Match Details
                    </button>
        </div>
    );


    
}
export default PlayerDetails;