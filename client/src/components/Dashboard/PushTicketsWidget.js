import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const PushTicketsWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_PUSHTICKETSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal>
          <Statistic.Value>
            {data.pushticketswidget.ticketswitherrors}
          </Statistic.Value>
          <Statistic.Label>
            Push Ticket Error
            {data.pushticketswidget.ticketswitherrors !== 1 ? "s" : ""}
          </Statistic.Label>
        </Statistic>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("/pushtickets")}
        >
          See Push Tickets
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_PUSHTICKETSWIDGET = gql`
  query pushticketswidget {
    pushticketswidget {
      ticketswitherrors
    }
  }
`;

PushTicketsWidget.propTypes = {
  history: PropTypes.object,
};

export default PushTicketsWidget;
