import { gql } from "@apollo/client";

export const PLUGIN = gql`
  query Plugin($id: ID!) {
    node(id: $id) {
      ... on Plugin {
        id
        images
        author
        like
        downloads
        name
        latestVersion {
          version
        }
      }
    }
  }
`;

export const SEARCH_PLUGIN = gql`
  query SearchPlugin(
    $first: Int!
    $keyword: String
    $liked: Boolean
    $tags: [String!]
    $types: [PluginType!]
    $publisher: ID
    $sort: PluginSort
    $after: Cursor
  ) {
    plugins(
      input: {
        keyword: $keyword
        liked: $liked
        tags: $tags
        types: $types
        publisher: $publisher
        sort: $sort
        after: $after
      }
    ) {
      nodes {
        id
        images
        author
        like
        downloads
        name
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const LIKE_PLUGIN = gql`
  mutation LikePlugin($id: ID!) {
    likePlugin(input: { pluginId: $id }) {
      plugin {
        id
        like
      }
    }
  }
`;

export const UNLIKE_PLUGIN = gql`
  mutation UnlikePlugin($id: ID!) {
    unlikePlugin(input: { pluginId: $id }) {
      plugin {
        id
        like
      }
    }
  }
`;
