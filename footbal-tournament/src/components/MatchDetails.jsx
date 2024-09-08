import React from "react";
import { useParams } from "react-router-dom";
import { useCSV } from "../hooks/useCSV"; 
//import './MatchDetails.css'; // Import the custom CSS for layout

const MatchDetails = () => {
  const { matchId } = useParams(); // Get matchId from url
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

  // function to filter players by their team
  const getTeamPlayers = (teamID) => {
    return players.filter(player => player.TeamID === teamID);
  };

  // Players for both teams
  const teamAPlayers = getTeamPlayers(match.ATeamID);
  const teamBPlayers = getTeamPlayers(match.BTeamID);

  return (
    <div className="match-details">
      {/* Display Match Result */}
      <h3>{`Match ${match.ID}: ${getTeamName(match.ATeamID)} vs ${getTeamName(match.BTeamID)}`}</h3>
      <p className="match-score">Score: {match.Score}</p>

      {/* Display both teams side by side */}
      <div className="teams">
        {/* TeamA */}
        <div className="team">
          <h4>{getTeamName(match.ATeamID)}</h4>
          <div className="formation">
            {teamAPlayers.map(player => (
              <div key={player.ID} className={`player ${player.Position}`}>
                {player.FullName} - {player.Position}
              </div>
            ))}
          </div>
        </div>

        {/* TeamB */}
        <div className="team">
          <h4>{getTeamName(match.BTeamID)}</h4>
          <div className="formation">
            {teamBPlayers.map(player => (
              <div key={player.ID} className={`player ${player.Position}`}>
                {player.FullName} - {player.Position}
              </div>
            ))}
          </div>
        </div>
      </div>
  </div>


    
  );
};

export default MatchDetails;