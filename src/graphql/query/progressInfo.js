import gql from 'graphql-tag';

export const PROGRESS_INFO_QUERY = gql`
  query searchProgress {
    book(id: 1) {
      id
      allPages
      status
      progress {
        id
        currentPage
        readAt
      }
    }
  }
`;
