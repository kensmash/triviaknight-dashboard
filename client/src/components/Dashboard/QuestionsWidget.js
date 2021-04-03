import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const QuestionsWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_QUESTIONSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal size="huge" color="green">
          <Statistic.Value>
            {data.questionswidget.totalquestions}
          </Statistic.Value>
          <Statistic.Label>Questions</Statistic.Label>
        </Statistic>
        <Card.Description>
          {data.questionswidget.unpublishedquestions} unpublished question
          {data.questionswidget.unpublishedquestions !== 1 && "s"}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="blue"
            onClick={() => props.history.push("admin/questions")}
          >
            See Questions
          </Button>
          <Button
            basic
            color="green"
            onClick={() => props.history.push("admin/questions/new")}
          >
            Add New Question
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

const QUERY_QUESTIONSWIDGET = gql`
  query questionswidget {
    questionswidget {
      totalquestions
      unpublishedquestions
    }
  }
`;

QuestionsWidget.propTypes = {
  history: PropTypes.object,
};

export default QuestionsWidget;
