import { gql } from "@apollo/client";

export const PLUGIN = gql`
  query Plugin($id: ID!) {
    node(id: $id, type: PLUGIN) {
      id
      ... on Plugin {
        id
        images
        author
        publisher {
          id
          name
          displayName
        }
        like
        downloads
        name
        icon
        readme
        description
        liked
        updatedAt
        active
        latestVersion {
          version
        }
      }
    }
  }
`;

export const PLUGINS = gql`
  query Plugins($ids: [ID!]!) {
    nodes(ids: $ids, type: PLUGIN) {
      id
      ... on Plugin {
        id
        images
        author
        publisher {
          id
          name
          displayName
        }
        like
        downloads
        name
        icon
        readme
        description
        liked
        updatedAt
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
        first: $first
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
        publisher {
          id
          name
          displayName
        }
        like
        liked
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
        liked
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
        liked
      }
    }
  }
`;

export const UPDATE_PLUGIN = gql`
  mutation UpdatePlugin(
    $pluginId: ID!
    $active: Boolean
    $images: [Upload!]
    $newTags: [String!]
    $deletedTags: [String!]
  ) {
    updatePlugin(
      input: {
        pluginId: $pluginId
        active: $active
        images: $images
        newTags: $newTags
        deletedTags: $deletedTags
      }
    ) {
      plugin {
        id
        active
        tags
        images
      }
    }
  }
`;

export const CREATE_PLUGIN = gql`
  mutation CreatePlugin($file: Upload, $repo: String, $publisher: ID) {
    createPlugin(input: { file: $file, repo: $repo, publisher: $publisher }) {
      plugin {
        id
        name
        description
        latestVersion {
          version
        }
        images
      }
    }
  }
`;

export const PARSE_PLUGIN = gql`
  mutation ParsePlugin($file: Upload, $repo: String) {
    parsePlugin(input: { file: $file, repo: $repo }) {
      plugin {
        id
        type
        name
        author
        publisher {
          id
          name
          displayName
        }
        description
        icon
        repository
        readme
        latestVersion {
          version
        }
      }
    }
  }
`;

export const UPDATE_PLUGIN_VERSION = gql`
  mutation UpdatePluginVersion(
    $pluginId: ID!
    $version: String!
    $description: String
    $active: Boolean
  ) {
    updateVersion(
      input: { pluginId: $pluginId, version: $version, description: $description, active: $active }
    ) {
      plugin {
        id
        name
        author
        publisher {
          id
          name
          displayName
        }
        description
        icon
        repository
        publishedAt
        readme
        latestVersion {
          version
          description
          downloads
          active
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;
