import { gql } from "@apollo/client";

export default gql`
  query categoriesQuery {
    categories {
      _id
      name
      type {
        _id
        name
      }
      genres {
        _id
        name
      }
      published
      partycategory
      joustexclusive
    }
  }
`;
