import React from "react";
import { useParams } from "react-router-dom";
import useCSV from "../hooks/useCSV";

export default function MatchDetails() {
  const {matchID} = useParams(); // get matchID from url
  const {data: matches, loading: matchesLoading, error: matchesError} = useCSV("/data/matches.csv");
  const {data: players, loading: playersLoading, error: playersError} = useCSV("/data/players.csv");
  const {data: teams, loading: teamsLoading, error: teamsError} = useCSV("/data/teams.csv");

  if (matchesLoading || playersLoading || teamsLoading) {
    return <p>Loading match details...</p>

  }

  //Find match by matchID
  const match = matches.find(m => m.ID === matchID);
  if (!match) return <p>Match not found</p>;
 // function to get team name by teamID
  const getTeamName = (teamID) => {
    const team = teams.find(team => team.ID === teamID);
    return team ? team.Name : "Unknown";
  };

  //function to filter players by their team
  const getTeamPlayers = (teamID) => {
    return players.filter(player => player.TeamID === teamID);
  };

  //Both teams players
  const teamAPlayers = getTeamPlayers(match.ATeamID);
  const teamBPlayers = getTeamPlayers(match.BTeamID);

  return (
    <div className="match-details">
      {/*display match result*/}
      <h2>{`Match ${match.ID}: ${getTeamName(match.ATeamID)} vs ${getTeamName(match.BTeamID)}`}</h2>
      <p className="match-score">Score: {match.Score}</p>

      {/*display both teams side by sise*/}
      <div className="teams">
        {/*teamA*/}
        <div className="team">
          <h3>{getTeamName(match.ATeamID)}</h3>
          <div className="formation">
            {teamAPlayers.map(player => (
              <div key={player.ID} className={`player ${player.Position}`}>
                {player.FullName} - {player.Position}
              </div>
            ))}

          </div>
        </div>

      {/*teamB*/}
      <div className="team">
          <h3>{getTeamName(match.BTeamID)}</h3>
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
  
}