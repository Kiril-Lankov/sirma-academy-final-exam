import React from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Team from "./pages/Team";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/match/:matchId" element={<Match/>}/>
        <Route path="/team/:teamId" element={<Team/>}/>

      </Routes>
    </Router>
  );
}

export default App;