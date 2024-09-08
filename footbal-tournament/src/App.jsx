import React from 'react';
//import {BrwoserRouter, Routes, Route, BrowserRouter} from "react-router-dom";
import { useCSV } from './hooks/useCSV';
//import MatchDetails from './components/MatchDetails';
import TeamDetails from './components/TeamDetails';
import PlayerInfo from './components/PlayerInfo';
import MatchBracket from './components/MatchBracket';

const App = () => {
  const { data: matches } = useCSV('/data/matches.csv');
  const { data: teams } = useCSV('/data/teams.csv');
  const { data: players } = useCSV('/data/players.csv');
  
  // Example usage with match and team details
  const match = matches[0]; // Assume first match
  const teamA = teams.find(t => t.ID === match.ATeamID);
  const teamB = teams.find(t => t.ID === match.BTeamID);

  const teamAPlayers = players.filter(p => p.TeamID === teamA.ID);
  const teamBPlayers = players.filter(p => p.TeamID === teamB.ID);

  return (
    <div className="App">
      
      <MatchBracket match={match}/>
      <TeamDetails team={{ ...teamA, players: teamAPlayers }} />
      
      
    </div>
  );
};

export default App;
