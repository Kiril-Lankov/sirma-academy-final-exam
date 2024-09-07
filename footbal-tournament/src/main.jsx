import React from 'react';
import { useCSV } from './hooks/useCSV';
import MatchDetails from './components/MatchDetails';
import TeamDetails from './components/TeamDetails';

const App = () => {
  const { data: matches } = useCSV('/data/matches.csv');
  const { data: teams } = useCSV('/data/teams.csv');
  const { data: players } = useCSV('/data/players.csv');

  console.log(data.matches)
  
  // Example usage with match and team details
  const match = matches[0]; // Assume first match
  const teamA = teams.find(t => t.ID === match.ATeamID);
  const teamB = teams.find(t => t.ID === match.BTeamID);

  const teamAPlayers = players.filter(p => p.TeamID === teamA.ID);
  const teamBPlayers = players.filter(p => p.TeamID === teamB.ID);

  return (
    <div className="App">
      <h1>Football Tournament</h1>
      <MatchDetails match={match} teamA={{ ...teamA, players: teamAPlayers }} teamB={{ ...teamB, players: teamBPlayers }} />
      <TeamDetails team={{ ...teamA, players: teamAPlayers }} />
    </div>
  );
};

export default App;