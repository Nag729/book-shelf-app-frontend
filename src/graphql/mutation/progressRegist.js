import gql from 'graphql-tag';

export const PROGRESS_REGIST_MUTATION = gql`
  mutation createProgress(
    $bookId: ID!
    $currentPage: Int!
    $readAt: ISO8601DateTime!
    $note: String
  ) {
    createProgress(
      bookId: $bookId
      currentPage: $currentPage
      readAt: $readAt
      note: $note
    ) {
      id
      currentPage
      readAt
      note
      book {
        id
        title
      }
    }
  }
`;
