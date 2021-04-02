import { gql } from "@apollo/client";

export default gql`
  query categoryGenreSearchCriteria {
    categoryGenreSearchCriteria @client {
      activePage
      limit
      name
      types
    }
  }
`;
