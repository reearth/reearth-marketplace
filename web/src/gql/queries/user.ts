import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe($first: Int!, $after: Cursor) {
    me {
      id
      name
      lang
      displayName
      description
      plugins(first: $first, after: $after) {
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
          # publishedAt
          updatedAt
        }
        pageInfo {
          endCursor
          hasNextPage
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
