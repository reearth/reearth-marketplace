import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe($first: Int!, $offset: Int) {
    me {
      id
      name
      lang
      displayName
      description
      plugins(first: $first, offset: $offset) {
        nodes {
          id
          images
          author
          like
          liked
          downloads
          name
          readme
          icon
          latestVersion {
            version
          }
          active
          updatedAt
        }
        totalCount
      }
    }
  }
`;

export const UPDATE_ME = gql`
  mutation UpdateMe(
    $name: String
    $lang: Lang
    $displayName: String
    $description: String
    $tel: String
  ) {
    updateMe(
      input: {
        name: $name
        lang: $lang
        displayName: $displayName
        description: $description
        tel: $tel
      }
    ) {
      me {
        id
        name
        lang
        displayName
        description
        tel
      }
    }
  }
`;
