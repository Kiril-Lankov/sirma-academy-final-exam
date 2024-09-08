import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCSV from "../hooks/useCSV";
import { useNavigate} from "react-router-dom";

import "./TeamDetails.css";

export default function TeamDetails() {
  const { teamId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: teams, loading: teamsLoading } = useCSV("/data/teams.csv");
  const { data: players, loading: playersLoading } = useCSV("/data/players.csv");
 // use this to pass data from one route to other 
  const matchId = location.state ? location.state.matchId: null;
  

  if (teamsLoading || playersLoading) return <p>Loading team details...</p>;

  // find the team by its ID
  const team = teams.find(t => t.ID === teamId);

  if (!team) {
    return <p>Team not found.</p>;
  }

  const teamPlayers = players.filter(p => p.TeamID === teamId);

  

  return (
    <div>
      <h1>{team.Name}</h1>
      <p className="manager">Manager: {team.ManagerFullName}</p>
      <p className="group">Group: {team.Group}</p>

      <div className="roster">

        <ul>
          {teamPlayers.map(player => (
            <li key={player.ID}>
              {player.TeamNumber}: {player.FullName} - {player.Position}
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
}

    