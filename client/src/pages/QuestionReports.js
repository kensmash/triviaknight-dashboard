import React from "react";
import QuestionReportsList from "../components/QuestionReportsList/QuestionReportsList";

const QuestionReports = ({ history, match }) => (
  <QuestionReportsList history={history} match={match} />
);

export default QuestionReports;
