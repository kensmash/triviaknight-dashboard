import { gql } from "@apollo/client";

export default gql`
  query questionQuery($id: ID!) {
    question(id: $id) {
      _id
      question
      answers {
        answer
        correct
      }
      category {
        _id
        name
      }
      type
      difficulty
      published
      guessable
    }
  }
`;
