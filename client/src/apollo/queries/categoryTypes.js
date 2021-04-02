import { gql } from "@apollo/client";

export default gql`
  {
    categoryTypes {
      _id
      name
      hasgenres
      playable
    }
  }
`;
