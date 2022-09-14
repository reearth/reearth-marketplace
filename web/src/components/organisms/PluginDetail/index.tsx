import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React, { useCallback } from "react";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
  accessToken?: string;
  installedPlugins?: {
    id: string;
    version: string;
  }[];
  onPluginInstall?: (pluginId: string) => void;
  onBack?: () => void;
};

const PluginDetail: React.FC<Props> = ({
  pluginId,
  accessToken,
  installedPlugins,
  onPluginInstall: onExtPluginInstall,
  onBack,
}) => {
  const { isAuthenticated } = useAuth(accessToken);
  const handleClickChoose = () => {};
  const { plugin, workspaces, modalVisible, onLike, onUnlike, onToggleModal, onPluginInstall } =
    useHooks(pluginId ? pluginId : "", installedPlugins);

  const handleClickLike = useCallback(
    (isLiked: boolean) => {
      if (!pluginId) return;
      isLiked ? onUnlike(pluginId) : onLike(pluginId);
    },
    [onLike, onUnlike, pluginId],
  );

  return plugin ? (
    <PluginDetailPage
      isLoggedIn={isAuthenticated}
      plugin={plugin}
      workspaces={workspaces}
      modalVisible={modalVisible}
      handleClickLike={handleClickLike}
      handleClickChoose={handleClickChoose}
      onPluginInstall={onPluginInstall}
      onExtPluginInstall={onExtPluginInstall}
      onToggleModal={onToggleModal}
      onBack={onBack}
    />
  ) : null;
};

export default PluginDetail;
