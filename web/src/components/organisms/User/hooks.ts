import { useMemo } from "react";

import { useGetMeQuery } from "@marketplace/gql";

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
            displayName: data.me.displayName || data.me.name || "",
            description: data.me ? data.me.description : "",
          }
        : undefined,
    [data?.me],
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
            : undefined,
        )
        .filter((p): p is Plugin => !!p),
    [data?.me.plugins.nodes],
  );

  return {
    myData,
    plugins,
  };
};
