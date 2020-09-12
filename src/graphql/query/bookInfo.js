import gql from "graphql-tag";

export const BOOK_INFO_QUERY = gql`
  query searchBook($id: ID!) {
    book(id: $id) {
      id
      title
      imageUrl
    }
  }
`;
