import { gql } from "@apollo/client";

export const GET_ME = gql`
    query GetMe($first: Int!, $after: Cursor) {
        me {
            id
            plugins( first: $first, after: $after ) {
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
        updateMe( input: { name: $name, lang: $lang, displayName: $displayName, description: $description, tel: $tel } ) {
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