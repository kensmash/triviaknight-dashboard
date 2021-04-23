import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const AnnouncementsWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_ANNOUNCEMENTSWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal>
          <Statistic.Value>
            {data.announcementsWidget.totalannouncements}
          </Statistic.Value>
          <Statistic.Label>
            Announcement
            {data.announcementsWidget.totalannouncements !== 1 ? "s" : ""}
          </Statistic.Label>
        </Statistic>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("/announcements")}
        >
          See Announcements
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_ANNOUNCEMENTSWIDGET = gql`
  query announcementsWidget {
    announcementsWidget {
      totalannouncements
      unpublishedannouncements
    }
  }
`;

AnnouncementsWidget.propTypes = {
  history: PropTypes.object,
};

export default AnnouncementsWidget;
