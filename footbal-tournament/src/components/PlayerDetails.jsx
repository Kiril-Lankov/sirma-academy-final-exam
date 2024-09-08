import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCSV } from "../hooks/useCSV";

export default function PlayerDetails() {
    //get player ID from url
    const {playerId} = useParams();
    const navigate = useNavigate();
    const {data: records, loading: recordsLoading} = useCSV("/data/records.csv");

    if (recordsLoading)
        return <p>Loading player details...</p>;
    //find record by ID
    const playerRecord = records.find(record => record.ID === playerId);

    if (!playerRecord) 
        return <p>Player not found</p>

    return (
        <div className="player-details">
            <h2>{playerRecord.Fullname}</h2>
            <p>Position: {playerRecord.Position}</p>
            <p>Team:{playerRecord.Team}</p>
            <p>Age:{playerRecord.Age}</p>
            <p>Matches Played: {playerRecord.MatchesPlayed}</p>
            <p>Goals scored: {playerRecord.GoalsScored}</p>
            <p>Yellow cards: {playerRecord.YellowCards}</p>
            <p>Red cards: {playerRecord.RedCards}</p>

            <button className="back-button" onClick={() => navigate("/")}>
                Home Page
                </button>

                <button className="back-button" onClick={() => navigate(-1)}>
                    Back to Match Details
                    </button>
        </div>
    );


    
}