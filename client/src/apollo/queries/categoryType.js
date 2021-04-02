import { gql } from "@apollo/client";

export default gql`
  query categoryTypeQuery($id: ID!) {
    categoryType(id: $id) {
      _id
      name
      iconname
      iconset
      hasgenres
      playable
      nextquestactive
    }
  }
`;
