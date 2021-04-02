import { gql } from "@apollo/client";

export default gql`
  query currentUser {
    currentUser {
      _id
      name
      avatar
      isAdmin
    }
  }
`;
