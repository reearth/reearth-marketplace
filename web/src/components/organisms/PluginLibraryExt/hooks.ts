import { useCallback, useMemo } from "react";

import { usePluginQuery } from "@/gql";

export default function (pluginId: string | undefined, onInstall?: (pluginId: string) => void) {
  const { data } = usePluginQuery({
    variables: {
      id: pluginId || "",
    },
    skip: !pluginId,
  });

  const plugin = useMemo(
    () =>
      data?.node?.__typename === "Plugin"
        ? {
            id: data.node.id,
            version: data.node.latestVersion?.version.replace(/^v/, ""),
            cover: data.node.images[0],
          }
        : undefined,
    [data],
  );

  const handleInstall = useCallback(
    () => plugin && onInstall?.(`${plugin.id}~${plugin.version}`),
    [plugin, onInstall],
  );

  return { plugin, handleInstall };
}
