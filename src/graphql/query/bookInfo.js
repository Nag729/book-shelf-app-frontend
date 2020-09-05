import gql from 'graphql-tag';

export const BOOK_INFO_QUERY = gql`
  query searchBook {
    book(id: 1) {
      id
      title
      imageUrl
    }
  }
`;
