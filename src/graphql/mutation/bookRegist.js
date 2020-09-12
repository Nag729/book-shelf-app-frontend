import gql from "graphql-tag";

export const BOOK_REGIST_MUTATION = gql`
  mutation createBook(
    $title: String!
    $imageUrl: String!
    $allPages: Int!
    $status: ReadStatus!
  ) {
    createBook(
      title: $title
      imageUrl: $imageUrl
      allPages: $allPages
      status: $status
    ) {
      id
      title
      imageUrl
    }
  }
`;
