import { gql } from "@apollo/client";

export default gql`
  query supportRequestPage(
    $limit: Int!
    $offset: Int!
    $replysent: Boolean
    $resolved: Boolean
  ) {
    supportRequestPage(
      limit: $limit
      offset: $offset
      replysent: $replysent
      resolved: $resolved
    ) {
      pages
      totalrecords
      requests {
        _id
        from
        subject
        text
        createdAt
        replysent
        resolved
      }
    }
  }
`;
