import { type Plugin } from "@marketplace/components/molecules/TopPage";
import {
  useSearchPluginQuery,
  useLikePluginMutation,
  useUnlikePluginMutation,
  PluginSort,
} from "@marketplace/gql/graphql-client-api";
import { useCallback, useMemo } from "react";

export { PluginSort };

export default (searchText?: string, sort?: PluginSort, liked?: boolean) => {
  const { data, refetch } = useSearchPluginQuery({
    variables: {
      first: 50,
      // TODO: fill variables here
      keyword: searchText,
      // liked: liked ? liked : false,
      // tags: [],
      // types: [],
      // publisher: "",
      sort: sort,
      // after: "",
    },
  });

  const [likePlugin] = useLikePluginMutation();
  const [unlikePlugin] = useUnlikePluginMutation();
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

  const plugins = useMemo(
    () =>
      data?.plugins.nodes
        .map((p): Plugin | undefined =>
          p
            ? {
                id: p.id,
                name: p.name,
                cover: p.images[0],
                author: p.author ? p.author : "",
                like: p.like,
                downloads: p.downloads,
              }
            : undefined
        )
        .filter((p): p is Plugin => !!p),
    [data?.plugins]
  );

  return {
    plugins,
    onLike,
    onUnlike,
  };
};
