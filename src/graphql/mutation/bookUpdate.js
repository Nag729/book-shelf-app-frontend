import gql from 'graphql-tag';

export const BOOK_UPDATE_MUTATION = gql`
  mutation updateBook(
    $id: ID!
    $title: String!
    $imageUrl: String!
    $allPages: Int!
    $status: ReadStatus!
  ) {
    updateBook(
      id: $id
      title: $title
      imageUrl: $imageUrl
      allPages: $allPages
      status: $status
    ) {
      id
    }
  }
`;
