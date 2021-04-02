import { gql } from "@apollo/client";

export default gql`
  query categorySearchCriteria {
    categorySearchCriteria @client {
      activePage
      limit
      name
      type
      genres
      partycategory
      showasnew
      showasupdated
    }
  }
`;
