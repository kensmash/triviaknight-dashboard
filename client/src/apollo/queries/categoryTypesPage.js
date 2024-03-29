import { gql } from "@apollo/client";

export default gql`
  query categoryTypesPage(
    $limit: Int!
    $offset: Int!
    $name: String
    $hasgenres: String
  ) {
    categoryTypesPage(
      limit: $limit
      offset: $offset
      name: $name
      hasgenres: $hasgenres
    ) {
      pages
      totalrecords
      categorytypes {
        _id
        name
        hasgenres
        playable
        questactive
        nextquestactive
      }
    }
  }
`;
