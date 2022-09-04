import {
  usePluginQuery,
  useLikePluginMutation,
  useUnlikePluginMutation,
} from "@marketplace/gql/graphql-client-api";
import { useCallback, useMemo } from "react";

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
            // TODO: where is publishDate?
            // publishData:
            version: data.node.latestVersion?.version,
            downloads: data.node.downloads,
          }
        : undefined,
    [data?.node]
  );

  return {
    plugin,
    onLike,
    onUnlike,
  };
};
