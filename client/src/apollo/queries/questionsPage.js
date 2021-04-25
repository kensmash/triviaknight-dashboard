import { gql } from "@apollo/client";

export default gql`
  query questionsPage(
    $offset: Int!
    $limit: Int!
    $question: String
    $category: ID
    $difficulty: String
    $type: String
    $published: Boolean
  ) {
    questionspage(
      offset: $offset
      limit: $limit
      question: $question
      category: $category
      difficulty: $difficulty
      type: $type
      published: $published
    ) {
      pages
      totalrecords
      questions {
        createdAt
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
      }
    }
  }
`;
