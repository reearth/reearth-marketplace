
import { gql } from "@apollo/client";

const SEARCH_PLUGIN = gql`
    query SearchPlugin($first: Int!, $keyword: String, $liked: Boolean, $tags: [String!], $types: [PluginType!], $publisher: ID, $sort: PluginSort, $after: Cursor) {
        plugins( input: {keyword: $keyword, liked: $liked, tags: $tags, types: $types, publisher: $publisher, sort: $sort, after: $after } ) {
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
`

const LIKE_PLUGIN = gql`
    mutation LikePlugin($id: ID!) {
        likePlugin( input: { pluginId: $id } ) {
            plugin {
                id
                like
            }
        }
    }
`

const UNLIKE_PLUGIN = gql`
    mutation UnlikePlugin($id: ID!) {
        unlikePlugin( input: { pluginId: $id } ) {
            plugin {
                id
                like
            }
        }
    }
`