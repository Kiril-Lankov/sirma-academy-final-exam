import React from "react";
import { useParams } from "react-router-dom";
import { useCSV } from "../hooks/useCSV";

const TeamDetails = () => {
  const { teamId } = useParams();
  const { data: teams, loading: teamsLoading } = useCSV("/data/teams.csv");
  const { data: players, loading: playersLoading } = useCSV("/data/players.csv");

  if (teamsLoading || playersLoading) return <p>Loading team details...</p>;

  // Find the team by its ID
  const team = teams.find(t => t.ID === teamId);

  if (!team) {
    return <p>Team not found.</p>;
  }

  const teamPlayers = players.filter(p => p.TeamID === teamId);

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
};

export default TeamDetails;