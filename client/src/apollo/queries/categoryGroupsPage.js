import { gql } from "@apollo/client";

export default gql`
  query categoryGroupsPage($limit: Int!, $offset: Int!) {
    categoryGroupsPage(limit: $limit, offset: $offset) {
      pages
      totalrecords
      categorygroups {
        _id
        name
        iconname
        displaytext
        active
        categories {
          _id
          name
        }
      }
    }
  }
`;
