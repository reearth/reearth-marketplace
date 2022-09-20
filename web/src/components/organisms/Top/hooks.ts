import { useApolloClient } from "@apollo/client";
import { useEffect, useMemo } from "react";

import { useAuth } from "@marketplace/auth/hooks";
import { type Plugin } from "@marketplace/components/molecules/TopPage";
import { useSearchPluginQuery, PluginSort } from "@marketplace/gql";

export { PluginSort };

export default (searchText?: string, sort?: PluginSort, liked?: boolean, accessToken?: string) => {
  const { isAuthenticated } = useAuth(accessToken);
  const gqlCache = useApolloClient().cache;

  const { data } = useSearchPluginQuery({
    variables: {
      first: 50,
      keyword: searchText,
      liked: liked || undefined,
      // tags: [],
      // types: [],
      // publisher: "",
      sort: sort,
      // after: "",
    },
  });

  const plugins = useMemo(
    () =>
      data?.plugins.nodes
        .map((p): Plugin | undefined =>
          p
            ? {
                id: p.id,
                name: p.name,
                cover: p.images[0],
                publisher: p.publisher.name,
                like: p.like,
                liked: p.liked,
                downloads: p.downloads,
              }
            : undefined,
        )
        .filter((p): p is Plugin => !!p),
    [data?.plugins],
  );

  useEffect(() => {
    return () => {
      gqlCache.evict({ fieldName: "plugins" });
    };
  }, [gqlCache]);

  return {
    plugins,
    isAuthenticated,
  };
};
