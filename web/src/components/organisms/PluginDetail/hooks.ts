import { useAuth } from "@marketplace/auth";
import { Workspace } from "@marketplace/components/molecules/PluginDetailPage";
import { usePluginQuery, useLikePluginMutation, useUnlikePluginMutation } from "@marketplace/gql";
import { useCallback, useEffect, useMemo, useState } from "react";

export type Plugin = {
  id: string;
  version: string;
};

export default (pluginId: string, installedPlugins?: Plugin[]) => {
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

  const plugin = useMemo(
    () =>
      currentPlugin
        ? {
            id: currentPlugin.id,
            name: currentPlugin.name,
            cover: currentPlugin.images[0],
            author: currentPlugin.author || "",
            like: currentPlugin.like,
            images: currentPlugin.images,
            description: currentPlugin.description || "",
            readme: currentPlugin.readme,
            liked: currentPlugin.liked,
            version: currentPlugin.latestVersion?.version,
            downloads: currentPlugin.downloads,
            updatedAt: currentPlugin.updatedAt,
            installed:
              installedPlugins &&
              installedPlugins.findIndex(
                p =>
                  p.id === currentPlugin.id && p.version === currentPlugin.latestVersion?.version,
              ) >= 0,
          }
        : undefined,
    [currentPlugin, installedPlugins],
  );

  const [modalVisible, onToggleModal] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    if (!modalVisible || !window.REEARTH_MARKETPLACE_CONFIG) return;
    const base = window.REEARTH_MARKETPLACE_CONFIG.reearthApi;

    (async () => {
      const token = await auth.getAccessToken();

      const data = await fetch(base + "/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: `query { me { teams { id, name, projects(first:100) { nodes { id, name } } } } }`,
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

  const handleOpenPluginInReearth = useCallback(
    (_workspaceId: string, projectId: string) => {
      location.href =
        (window.REEARTH_MARKETPLACE_CONFIG?.reearthWeb ?? "") +
        `/settings/projects/${projectId}/plugins?pluginId=${pluginId}`;
    },
    [pluginId],
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
