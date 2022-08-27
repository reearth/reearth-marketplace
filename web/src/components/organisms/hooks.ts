import { useCallback } from "react";
import { useSearchPluginQuery } from "@/gql/graphql-client-api";


export default () => {
    const { data, refetch } = useSearchPluginQuery({
        variables: {
            first: 50,
            // TODO: fill variables here
            // keyword: "",
            // liked: false,
            // tags: [],
            // types: [],
            // publisher: "",
            // sort: "",
            // after: "",
        },
    })
    return {
        plugins: data?.plugins,
    }
}