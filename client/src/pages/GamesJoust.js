import React from "react";
import GamesJoustList from "../components/GamesJoustList/GamesJoustList";

const GamesJoust = ({ history, match }) => (
  <GamesJoustList history={history} match={match} />
);

export default GamesJoust;
