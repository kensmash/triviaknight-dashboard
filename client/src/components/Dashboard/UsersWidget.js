import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const UsersWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_USERSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal size="huge" color="green">
          <Statistic.Value>{data.userwidget.totalusers}</Statistic.Value>
          <Statistic.Label>Users</Statistic.Label>
        </Statistic>
        <Card.Description>
          {data.userwidget.newusers} joined in the last 30 days
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("admin/users")}
        >
          See Users
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_USERSWIDGET = gql`
  query userWidget {
    userwidget {
      totalusers
      newusers
    }
  }
`;

export default UsersWidget;
