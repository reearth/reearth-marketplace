import {
  usePluginQuery,
  useLikePluginMutation,
  useUnlikePluginMutation,
} from "@marketplace/gql/graphql-client-api";
import { useCallback, useEffect, useMemo } from "react";

export default (pluginId: string) => {
  const { data, refetch } = usePluginQuery({
    variables: {
      id: pluginId,
    },
  });

  const [likePlugin] = useLikePluginMutation({ variables: { id: pluginId } });
  const [unlikePlugin] = useUnlikePluginMutation({
    variables: { id: pluginId },
  });
  const onLike = useCallback(
    async (id: string) => {
      await likePlugin({
        variables: {
          id,
        },
      });
      await refetch();
    },
    [likePlugin, refetch]
  );

  const onUnlike = useCallback(
    async (id: string) => {
      await unlikePlugin({
        variables: {
          id,
        },
      });
      await refetch();
    },
    [unlikePlugin, refetch]
  );
  console.log(data);

  const plugin = useMemo(
    () =>
      data?.node?.__typename === "Plugin"
        ? {
            id: data.node.id,
            name: data.node.name,
            cover: data.node.images[0],
            author: data.node.author ? data.node.author : "",
            like: data.node.like,
            images: data.node.images,
            // TODO: where is publishDate?
            // publishData:
            description: data.node.description ? data.node.description : "",
            icon: null,
            readme: data.node.readme,
            liked: data.node.liked,
            version: data.node.latestVersion?.version,
            downloads: data.node.downloads,
            updatedAt: data.node.updatedAt,
          }
        : undefined,
    [data?.node]
  );

  // useEffect(() => {
  //   const getMeFromReEarth = await fetch({
  //     url: window.REEARTH_CONFIG.reearthApi + "/graphql",
  //     method: "POST",
  //     data: JSON.stringify({
  //       "query": `query { me { teams { id, name, projects(first:100) { nodes { id, name } } } } }`
  //     }),
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //       'Content-Type': 'application/json',
  //     }
  //   }).then(r => r.json());
  //   console.log(getMeFromReEarth);
  // }, []);

  return {
    plugin,
    onLike,
    onUnlike,
  };
};
