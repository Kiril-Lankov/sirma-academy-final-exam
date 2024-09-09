import React from "react";
import { Link } from "react-router-dom";
import  useCSV from "../hooks/useCSV";

import './HomePage.css'; 
export default function HomePage() {
  const { data: matches, loading: matchesLoading, error: matchesError } = useCSV("/data/matches.csv");
  const { data: teams, loading: teamsLoading, error: teamsError } = useCSV("/data/teams.csv");

  if (matchesLoading || teamsLoading) return <p>Loading matches and teams...</p>;
  if (matchesError || teamsError) return <p>Error: {matchesError || teamsError}</p>;

  // function to get team name by ID
  const getTeamName = (teamID) => {
    const team = teams.find(t => t.ID === teamID);
    return team ? team.Name : "Unknown Team";
  }

  // parsing and date and handle cases for undefined date

  const normalData = (dateString) => {
    const chunks = dateString.split("/");
    const month = chunks[0].length === 1 ? `0${chunks[0]}` : chunks[0];
    const day = chunks[1].length === 1 ? `0${chunks[1]}` : chunks[1];
    return `${month}/${day}/${chunks[2]}`;
  }

  const parseDate = (dateString, teamID) => {
    if (!dateString) {
      console.error("Undefined date for this match");
      return null;
    }

    try {
      const normalizedData = normalData(dateString);
      const chunks = normalizedData.split("/")
    return new Date(`${chunks[2]}-${chunks[0]}-${chunks[1]}`);
  } catch (error) {
    console.log(`Invalid date format for match: ${dateString}`, error);
    return null;
  }
}
  
  // function to get matches by stage using Dates

  const getPhase = (date, matchID) => {
    const matchDate = parseDate(date, matchID);
    if (!matchDate) return null;

    const finalDate = new Date("2024-07-14");

    if (matchDate <= new Date("2024-06-26")) {
      return "Group Stage";

    } else if (matchDate <= new Date("2024-07-02")) {
      return "Round ot 16";

    } else if (matchDate <= new Date("2024-07-06")) {
      return "Quarter Finals";

    } else if (matchDate <= new Date("2024-07-10")) {
      return "Semi Finals";

    } else if (matchDate.toDateString() === finalDate.toDateString()) {
      return "Final";

    } return null;

  }
    


  //function to group matches by phase

  const groupMatchesByPhase = () => {
    return matches.reduce((acc, match) => {

      console.log("Match object", match)
      const phase = getPhase(match.Date, match.ID);
      if (!phase) return acc;
      if (!acc[phase]) 
        acc[phase] = [];

      acc[phase].push(match);
    
      return acc;
    }, {}) || {};
  }

  const matchesByPhase = groupMatchesByPhase();


  return (
    <div className="container">
      <h1>Football Tournament EURO 2024</h1>
    {Object.keys(matchesByPhase).length > 0 ? (
      Object.keys(matchesByPhase).map(phase => (
        <div key={phase}>
          <h2>{phase}</h2>
      <ul>
        {matchesByPhase[phase].map(match => ( 
         <li key={match.ID}>
            <Link to={`/match/${match.ID}`}>

              {`${getTeamName(match.ATeamID)} vs ${getTeamName(match.BTeamID)}`}
              {` - Score: ${match.Score}`}
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ))
) : ( 
  <p>No matches found</p>
)}
  </div>
  );

}

