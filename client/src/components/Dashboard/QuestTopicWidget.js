import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Card, Button } from "semantic-ui-react";

const QuestTopicWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_NEXTQUESTTOPIC, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content
        header={`Next Quest topic:
                ${
                  data.nextquesttopic.topic
                    ? data.nextquesttopic.topic
                    : " none chosen yet"
                }`}
      />
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("admin/categories")}
        >
          See Categories
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_NEXTQUESTTOPIC = gql`
  query nextQuestTopic {
    nextquesttopic {
      id
      type
      topic
    }
  }
`;

QuestTopicWidget.propTypes = {
  history: PropTypes.object,
};

export default QuestTopicWidget;
