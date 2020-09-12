import gql from "graphql-tag";

export const ALL_BOOKS_QUERY = gql`
  query searchAllBooks {
    allBooks {
      id
      title
      imageUrl
    }
  }
`;
