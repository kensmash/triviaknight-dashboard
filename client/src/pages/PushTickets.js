import React from "react";
import PushTicketsList from "../components/PushTicketsList/PushTicketsList";

const PushTickets = (props) => (
  <PushTicketsList history={props.history} match={props.match} />
);

export default PushTickets;
