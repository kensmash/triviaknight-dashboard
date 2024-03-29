import { gql } from "@apollo/client";

export default gql`
  query categoriesPage($input: categoryPageInput) {
    categoriespage(input: $input) {
      pages
      totalrecords
      categories {
        _id
        name
        description
        iconname
        type {
          _id
          name
        }
        genres {
          _id
          name
        }
        published
        partycategory
        showasnew
        showaspopular
        showasupdated
        joustexclusive
        questactive
        nextquestactive
        questions
      }
    }
  }
`;
