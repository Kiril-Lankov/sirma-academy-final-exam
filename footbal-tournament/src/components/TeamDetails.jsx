import React from "react";
import { useParams } from "react-router-dom";
import useCSV from "../hooks/useCSV";

export default function TeamDetails() {
  const {teamID} = useParams();
  const {data: teams, loading : teamsLoading, error: teamsError} = useCSV("/data/teams.csv");
  const {data:players, loading: playersLoading, error: playersError} = useCSV("/data/players.csv");

  if (teamsLoading || playersLoading)
    return <p>Loading team...</p>

  //finding tem by its ID
  const team = teams.find(t => t.ID === teamID);

  if (!team)
    return <p>Team not found</p>;

  const teamPlayers = players.filter(p => p.teamID === teamID);

  return (
    <div>
      <h2>{team.Name}</h2>
      <p>Manager: {team.ManagerFullName}</p>

      <h3>Team Roster</h3>
      <ul>
        {teamPlayers.map(player => (
          <li key={player.ID}>
            {player.FullName} - {player.Position}
            </li>
        ))}
      </ul>
    </div>
  
  );

}
