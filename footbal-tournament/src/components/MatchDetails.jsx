import React from "react";
import { useParams,} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import useCSV  from "../hooks/useCSV";

import './MatchDetails.css'; 

export default function MatchDetails() {
  
  const { matchId } = useParams(); // Get matchId from url
  const navigate = useNavigate();
  const { data: matches, loading: matchesLoading } = useCSV("/data/matches.csv");
  const { data: players, loading: playersLoading } = useCSV("/data/players.csv");
  const { data: teams, loading: teamsLoading } = useCSV("/data/teams.csv");

  if (matchesLoading || playersLoading || teamsLoading) return <p>Loading match details...</p>;

  // Find match by matchId
  const match = matches.find(m => m.ID === matchId);
  if (!match) return <p>Match not found.</p>;

  // function to get team name by TeamID
  const getTeamName = (teamID) => {
    const team = teams.find(team => team.ID === teamID);
    return team ? team.Name : "Unknown Team";
  };

  

  // Players for both teams
  const teamAPlayers = players.filter(player => player.TeamID === match.ATeamID);
  const teamBPlayers = players.filter(player => player.TeamID === match.BTeamID);

  return (
    <div className="match-details">
      <h3>{`Match ${match.ID}: ${getTeamName(match.ATeamID)} vs ${getTeamName(match.BTeamID)}`}</h3>
      <p className="match-score">Score: {match.Score}</p>

      <div className="teams">
       
        <div className="team">
          <Link to={`/team/${match.ATeamID}`} state={{matchId: match.ID}} className="team-name">
            <h4>{getTeamName(match.ATeamID)}</h4>
          </Link>
          <div className="formation">
            {teamAPlayers.map(player => (
              <Link to={`/player/${player.ID}`} key={player.ID} className="player-info">
              <div className={`player ${player.Position}`}>
                {player.FullName} - {player.Position}
              </div>
              </Link>
            ))}
          </div>
        </div>

        
        <div className="team">
        <Link to={`/team/${match.BTeamID}`} state={{matchId: match.ID}} className="team-name">
            <h4>{getTeamName(match.BTeamID)}</h4>
          </Link>
          <div className="formation">
            {teamBPlayers.map(player => (
              <Link to={`/player/${player.ID}`} key={player.ID} className="player-info">
              <div className={`player ${player.Position}`}>
                {player.FullName} - {player.Position}
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <button className="home-button" onClick={() => navigate("/")}>
          HomePage
        </button>
      </div>
    </div>



  );
}

