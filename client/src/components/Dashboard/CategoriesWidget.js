import React from "react";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Statistic } from "semantic-ui-react";

const CategoriesWidget = (props) => {
  const { loading, error, data } = useQuery(QUERY_CATEGORIESWIDGET, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Card>
      <Card.Content>
        <Statistic horizontal size="huge" color="green">
          <Statistic.Value>
            {data.categorieswidget.totalcategories}
          </Statistic.Value>
          <Statistic.Label>Categories</Statistic.Label>
        </Statistic>
        <Card.Description>
          {data.categorieswidget.unpublishedcategories} unpublished
          {data.categorieswidget.unpublishedcategories === 1
            ? " category"
            : " categories"}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          fluid
          color="blue"
          onClick={() => props.history.push("/categories")}
        >
          See Categories
        </Button>
      </Card.Content>
    </Card>
  );
};

const QUERY_CATEGORIESWIDGET = gql`
  query categoriesWidget {
    categorieswidget {
      totalcategories
      unpublishedcategories
    }
  }
`;

CategoriesWidget.propTypes = {
  history: PropTypes.object,
};

export default CategoriesWidget;
