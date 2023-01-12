import { useApolloClient } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@marketplace/auth/hooks";
import { type Plugin } from "@marketplace/components/molecules/TopPage";
import { useSearchPluginQuery, PluginSort } from "@marketplace/gql";

export { PluginSort };

export default (
  pageSize: number,
  searchText?: string,
  sort?: PluginSort,
  liked?: boolean,
  accessToken?: string,
) => {
  const [page, setPage] = useState<number>(1);
  const { isAuthenticated } = useAuth(accessToken);
  const gqlCache = useApolloClient().cache;

  const { data, loading: loadingPlugins } = useSearchPluginQuery({
    variables: {
      first: pageSize,
      offset: (page - 1) * pageSize,
      keyword: searchText,
      liked: liked || undefined,
      sort: sort,
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
                publisher: p.publisher.displayName || p.publisher.name,
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
    page,
    totalCount: data?.plugins.totalCount ?? 0,
    handlePageChange: setPage,
    loadingPlugins,
  };
};
