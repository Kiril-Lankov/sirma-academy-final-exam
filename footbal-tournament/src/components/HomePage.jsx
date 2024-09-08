import React from "react";
import { Link } from "react-router-dom";
import  useCSV from "../hooks/useCSV";

export default function HomePage() {
  const { data: matches, loading: matchesLoading, error: matchesError } = useCSV("/data/matches.csv");
  const { data: teams, loading: teamsLoading, error: teamsError } = useCSV("/data/teams.csv");

  if (matchesLoading || teamsLoading) return <p>Loading matches and teams...</p>;
  if (matchesError || teamsError) return <p>Error: {matchesError || teamsError}</p>;

  // function to get team name by ID
  const getTeamName = (teamID) => {
    const team = teams.find(t => t.ID === teamID);
    return team ? team.Name : "Unknown Team";
  };
  

  return (
    <div className="container">
      <h1>Football Tournament EURO 2024</h1>

      
      <ul>
        {matches.map((match) => (
          <li key={match.ID}>
            <Link to={`/match/${match.ID}`}>
              {`Match ${match.ID}: ${getTeamName(match.ATeamID)} vs ${getTeamName(match.BTeamID)} - Score: ${match.Score}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
