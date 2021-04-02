import { gql } from "@apollo/client";

export default gql`
  {
    categoryGenres {
      _id
      name
      playable
      categorytypes {
        _id
      }
    }
  }
`;
