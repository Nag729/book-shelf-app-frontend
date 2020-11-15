import gql from 'graphql-tag';

export const BOOK_DELETE_MUTATION = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
