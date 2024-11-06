import { useCallback, useEffect, useMemo, useState } from "react";

import { useAuth } from "@marketplace/auth";
import { Workspace } from "@marketplace/components/molecules/PluginDetailPage";
import { getConfig } from "@marketplace/config";
import { usePluginQuery, useLikePluginMutation, useUnlikePluginMutation } from "@marketplace/gql";

export type Plugin = {
  id: string;
  version: string;
};

export default (pluginId: string, installedPlugins?: Plugin[]) => {
  const config = getConfig();
  const auth = useAuth();

  const { data, refetch } = usePluginQuery({
    variables: {
      id: pluginId,
    },
  });
  const currentPlugin = data?.node?.__typename === "Plugin" && data.node;

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
    [likePlugin, refetch],
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
    [unlikePlugin, refetch],
  );

  const plugin = useMemo(() => {
    if (!currentPlugin) return undefined;

    const installedPlugin = installedPlugins?.find(ip => ip.id === currentPlugin.id);

    return currentPlugin
      ? {
          id: currentPlugin.id,
          name: currentPlugin.name,
          cover: currentPlugin.images[0],
          publisher: currentPlugin.publisher.displayName || currentPlugin.publisher.name,
          like: currentPlugin.like,
          images: currentPlugin.images,
          description: currentPlugin.description || "",
          readme: currentPlugin.readme,
          liked: currentPlugin.liked,
          version: currentPlugin.latestVersion?.version,
          downloads: currentPlugin.downloads,
          updatedAt: currentPlugin.updatedAt,
          hasUpdate: !!(
            currentPlugin.latestVersion?.version &&
            installedPlugin?.version &&
            currentPlugin.latestVersion?.version > installedPlugin?.version
          ),
          installed:
            installedPlugins &&
            installedPlugins.findIndex(
              p => p.id === currentPlugin.id && p.version === currentPlugin.latestVersion?.version,
            ) >= 0,
          isCorePlugin: currentPlugin.core,
        }
      : undefined;
  }, [currentPlugin, installedPlugins]);

  const [modalVisible, onToggleModal] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const config = getConfig();
    if (!modalVisible || !config) return;
    const base = config.reearthApi;

    (async () => {
      const token = await auth.getAccessToken();

      const data = await fetch(base + "/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: `query { me { teams { id, name, projects(last:10000) { nodes { id, name, coreSupport } } } } }`, // TODO: This is only workaround, We need to either implement load by page OR load by current selected workspace
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(r => r.json());

      if (!data.data) return;
      const ws = data.data.me.teams.map((t: any) => ({
        ...t,
        projects: t.projects.nodes,
      }));
      setWorkspaces(ws);
    })();
  }, [auth, modalVisible]);

  const getPluginLocationPath = useCallback(
    ({ isCorePlugin, projectId }: { isCorePlugin: boolean; projectId: string }): string => {
      if (!projectId?.trim()) {
        console.error("Invalid project ID provided");
        return "";
      }

      const visualizerBasePath = config?.reearthVisualizerWeb ?? "";
      const classicBasePath = config?.reearthClassicWeb ?? "";

      const basePath = isCorePlugin ? visualizerBasePath : classicBasePath;
      if (!basePath) {
        console.error(`Missing configuration for ${isCorePlugin ? "visualizer" : "classic"} web`);
        return "";
      }

      return `${basePath}/settings/projects/${encodeURIComponent(
        projectId,
      )}/plugins?pluginId=${encodeURIComponent(pluginId)}`;
    },
    [config, pluginId],
  );

  const handleOpenPluginInReearth = useCallback(
    ({ isCorePlugin, projectId }: { isCorePlugin: boolean; projectId: string }) => {
      const url = getPluginLocationPath({ isCorePlugin, projectId });
      if (!url) {
        console.error("Failed to get plugin location path");
        return;
      }

      location.href = url;
    },
    [getPluginLocationPath],
  );

  return {
    plugin,
    workspaces,
    modalVisible,
    onLike,
    onUnlike,
    onToggleModal,
    handleOpenPluginInReearth,
  };
};
