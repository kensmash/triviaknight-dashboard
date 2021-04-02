import { gql } from "@apollo/client";

export default gql`
  query categoryGenreQuery($id: ID!) {
    categoryGenre(id: $id) {
      _id
      name
      playable
      nextquestactive
      categorytypes {
        _id
        name
      }
    }
  }
`;
