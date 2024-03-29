import { gql } from "@apollo/client";

export default gql`
  query usersPage($limit: Int!, $offset: Int!, $name: String) {
    userspage(limit: $limit, offset: $offset, name: $name) {
      pages
      totalrecords
      users {
        _id
        name
        avatar
        createdAt
        updatedAt
        categories {
          _id
        }
        sologames {
          _id
        }
        joustgames {
          _id
        }
      }
    }
  }
`;
