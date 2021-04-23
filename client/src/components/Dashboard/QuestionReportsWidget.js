import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const QuestionReportsWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_QUESTIONREPORTSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal>
          <Statistic.Value>
            {data.questionreportswidget.totalreports}
          </Statistic.Value>
          <Statistic.Label>
            Question Report
            {data.questionreportswidget.totalreports !== 1 ? "s" : ""}
          </Statistic.Label>
        </Statistic>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("/questions/reports")}
        >
          See Question Reports
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_QUESTIONREPORTSWIDGET = gql`
  query questionReportsWidget {
    questionreportswidget {
      totalreports
    }
  }
`;

QuestionReportsWidget.propTypes = {
  history: PropTypes.object,
};

export default QuestionReportsWidget;
