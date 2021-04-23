import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const SupportRequestsWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_SUPPORTREQUESTSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal>
          <Statistic.Value>
            {data.supportrequestswidget.openrequests}
          </Statistic.Value>
          <Statistic.Label>
            Open Support Request
            {data.supportrequestswidget.openrequests !== 1 ? "s" : ""}
          </Statistic.Label>
        </Statistic>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("/supportrequests")}
        >
          See Support Requests
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_SUPPORTREQUESTSWIDGET = gql`
  query supportrequestswidget {
    supportrequestswidget {
      openrequests
      newrequests
    }
  }
`;

SupportRequestsWidget.propTypes = {
  history: PropTypes.object,
};

export default SupportRequestsWidget;
