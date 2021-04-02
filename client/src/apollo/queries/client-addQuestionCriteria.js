import { gql } from "@apollo/client";

export default gql`
  query addQuestionCriteria {
    addQuestionCriteria @client {
      category
    }
  }
`;
