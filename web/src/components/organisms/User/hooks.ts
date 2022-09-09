import { useGetMeQuery } from "@marketplace/gql/graphql-client-api";
import { useMemo } from "react";

import { type Plugin } from "./";

export default () => {
  const { data } = useGetMeQuery({
    variables: {
      first: 50,
    },
  });

  const myData = useMemo(
    () =>
      data?.me.__typename === "Me"
        ? {
            id: data.me.id,
            displayName: data.me ? data.me.displayName : "",
            description: data.me ? data.me.description : "",
          }
        : undefined,
    [data?.me]
  );
  const plugins = useMemo(
    () =>
      data?.me.plugins.nodes
        .map((p): Plugin | undefined =>
          p
            ? {
                id: p.id,
                name: p.name,
                version: p.latestVersion ? p.latestVersion.version : "",
                cover: p.images[0],
                like: p.like,
                downloads: p.downloads,
                author: p.author ? p.author : "",
              }
            : undefined
        )
        .filter((p): p is Plugin => !!p),
    [data?.me.plugins.nodes]
  );

  return {
    myData,
    plugins,
  };
};
