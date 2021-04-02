import { gql } from "@apollo/client";

export default gql`
  query questionSearchCriteria {
    questionSearchCriteria @client {
      activePage
      limit
      question
      category
      difficulty
      type
      publishedstatus
    }
  }
`;
