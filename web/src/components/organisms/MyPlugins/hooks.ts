import { useCallback, useMemo } from "react";

import { useGetMeQuery, useUpdatePluginMutation } from "@marketplace/gql";

import { type Plugin } from "./";

export default (id?: string, active?: boolean) => {
  const { data, refetch } = useGetMeQuery({
    variables: {
      first: 50,
    },
  });

  const [updatePlugin] = useUpdatePluginMutation({
    variables: { pluginId: id ? id : "", active: active },
  });

  const handleTogglePublish = useCallback(
    async (id: string, active: boolean) => {
      await updatePlugin({
        variables: {
          pluginId: id,
          active: active,
        },
      });
      await refetch();
    },
    [updatePlugin, refetch],
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
                updateAt: p.updatedAt,
                active: p.active,
              }
            : undefined,
        )
        .filter((p): p is Plugin => !!p),
    [data?.me.plugins.nodes],
  );

  return {
    plugins,
    handleTogglePublish,
  };
};
