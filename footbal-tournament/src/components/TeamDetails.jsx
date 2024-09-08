import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCSV } from "../hooks/useCSV";
import { useNavigate} from "react-router-dom";

const TeamDetails = () => {
  const { teamId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: teams, loading: teamsLoading } = useCSV("/data/teams.csv");
  const { data: players, loading: playersLoading } = useCSV("/data/players.csv");

  const matchId = location.state ? location.state.matchId: null;
  

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
      <p>Group: {team.Group}</p>

      <div className="roster">
        <h3>Team Roster</h3>
        <ul>
          {teamPlayers.map(player => (
            <li key={player.ID}>
              {player.FullName} - {player.Position}
            </li>
          ))}
        </ul>
      </div>

      <div className="back-button-container">
        <button className="home-button" onClick={() => navigate("/")}>
          HomePage
        </button>
        {matchId && (
        <button className="back-button" onClick={() => navigate(`/match/${matchId}`) }>
          Back to Match Details
          </button>
        )}
      </div>
      </div>
      );
};

      export default TeamDetails;