
import { gql } from "@apollo/client";

const SEARCH_PLUGIN = gql`
    query SearchPlugin($first: Int!, $keyword: String, $liked: Boolean, $tags: [String!], $types: [PluginType!], $publisher: ID, $sort: PluginSort, $after: Cursor) {
        plugins( input: {keyword: $keyword, liked: $liked, tags: $tags, types: $types, publisher: $publisher, sort: $sort, after: $after } ) {
            nodes {
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