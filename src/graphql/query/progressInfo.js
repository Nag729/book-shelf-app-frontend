import gql from 'graphql-tag';

export const PROGRESS_INFO_QUERY = gql`
  query searchProgress($id: ID!) {
    book(id: $id) {
      id
      allPages
      status
      progress {
        id
        currentPage
        readAt
        note
      }
    }
  }
`;
