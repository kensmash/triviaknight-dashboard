import React from "react";
import { Form } from "semantic-ui-react";
//components
import CategoryForm from "../components/CategoryForm/CategoryForm";
//graphql
import { useQuery } from "@apollo/client";
import QUERY_CATEGORY from "../apollo/queries/category";

const EditCategory = ({ match, history }) => {
  const { loading, error, data: { category } = {} } = useQuery(QUERY_CATEGORY, {
    variables: { id: match.params._id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Form>
      <CategoryForm pageType="edit" category={category} history={history} />
    </Form>
  );
};

export default EditCategory;
