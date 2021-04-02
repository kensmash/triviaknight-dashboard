import { gql } from "@apollo/client";

export default gql`
  query currentUser {
    currentUser @client {
      loggedin
      isAdmin
    }
  }
`;
