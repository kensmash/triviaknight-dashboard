import React from "react";
import SupportRequestList from "../components/SupportRequestList/SupportRequestList";

const SupportRequests = ({ match, history }) => (
  <SupportRequestList history={history} match={match} />
);

export default SupportRequests;
