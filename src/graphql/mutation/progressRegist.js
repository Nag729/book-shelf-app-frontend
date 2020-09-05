import gql from 'graphql-tag';

export const PROGRESS_REGIST_MUTATION = gql`
  mutation createProgress($currentPage: Int!, $readAt: ISO8601DateTime!) {
    createProgress(bookId: 1, currentPage: $currentPage, readAt: $readAt) {
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
