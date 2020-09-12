import gql from 'graphql-tag';

export const PROGRESS_REGIST_MUTATION = gql`
  mutation createProgress(
    $bookId: ID!
    $currentPage: Int!
    $readAt: ISO8601DateTime!
  ) {
    createProgress(
      bookId: $bookId
      currentPage: $currentPage
      readAt: $readAt
    ) {
      id
      currentPage
      readAt
      book {
        id
        title
      }
    }
  }
`;
