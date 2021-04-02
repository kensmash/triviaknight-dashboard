import { gql } from "@apollo/client";

export default gql`
  query supportRequestQuery($id: ID!) {
    supportrequest(id: $id) {
      _id
      replysent
      resolved
      from
      text
      subject
      createdAt
    }
  }
`;
