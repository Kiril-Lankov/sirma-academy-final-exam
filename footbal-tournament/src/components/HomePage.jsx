import React from "react";
import {Link} from "react-router-dom";
import useCSV from "../hooks/useCSV";

export default function HomePage() {

  const{data: matches, loading: matchesLoading, error: matchesError} = useCSV("/data/macthes.csv");
  const{data: teams, loading: teamsLoading, error: teamsError} = useCSV("/data/teams.csv");

  if (matchesLoading || teamsLoading) {
    return <p>Loading...</p>;
  } 
    if (matchesError || teamsError) {
      return <p>Error: {matchesError || teamsError}</p>;
  }

  //Create function to get team name by using ID
  const getTeamname = (teamID) => {
    const team = teams.find(t => t.ID === teamID);
    return team ? team.Name : "Unknown";
  };

  return (
    <div className="container">
      <h1>Footbal tournament Euro 2024</h1>
      {/*List all matches*/}
      <ul>
        {matches.map((match) => (
          <li key={match.ID}>
            <Link to={`/match/${match.ID}`}>
            {`Match ${match.ID}: ${getTeamname(match.ATeamID)} vs ${getTeamname(match.BTeamID)} - Score:${match.Score}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}