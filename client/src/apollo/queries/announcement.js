import { gql } from "@apollo/client";

export default gql`
  query announcementQuery($id: ID!) {
    announcement(id: $id) {
      _id
      headline
      text
      published
      createdAt
      updatedAt
    }
  }
`;
