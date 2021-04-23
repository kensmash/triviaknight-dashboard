import React from "react";
import QuestionForm from "../components/QuestionForm/QuestionForm";

const NewQuestion = (props) => (
  <div>
    <QuestionForm history={props.history} match={props.match} />
  </div>
);

export default NewQuestion;
