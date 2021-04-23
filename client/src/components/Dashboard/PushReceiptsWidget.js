import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const PushReceiptsWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_PUSHRECEIPTSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal>
          <Statistic.Value>
            {data.pushreceiptswidget.receiptswitherrors}
          </Statistic.Value>
          <Statistic.Label>
            Push Receipt Error
            {data.pushreceiptswidget.receiptswitherrors !== 1 ? "s" : ""}
          </Statistic.Label>
        </Statistic>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("/pushreceipts")}
        >
          See Push Receipts
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_PUSHRECEIPTSWIDGET = gql`
  query pushreceiptswidget {
    pushreceiptswidget {
      receiptswitherrors
    }
  }
`;

PushReceiptsWidget.propTypes = {
  history: PropTypes.object,
};

export default PushReceiptsWidget;
