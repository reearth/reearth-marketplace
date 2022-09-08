import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React, { useCallback } from "react";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
  accessToken?: string;
  onPluginInstall?: (pluginId: string) => void;
};

const PluginDetail: React.FC<Props> = ({
  pluginId,
  accessToken,
  onPluginInstall: onExtPluginInstall,
}) => {
  const { isAuthenticated } = useAuth(accessToken);
  const handleClickChoose = () => {};
  const { plugin, workspaces, modalVisible, onLike, onUnlike, onToggleModal, onPluginInstall } =
    useHooks(pluginId ? pluginId : "");

  const handleClickLike = useCallback(
    (isLiked: boolean) => {
      if (!pluginId) return;
      isLiked ? onUnlike(pluginId) : onLike(pluginId);
    },
    [onLike, onUnlike, pluginId],
  );
  return (
    <PluginDetailPage
      isLiked={plugin ? plugin.liked : false}
      isLoggedIn={isAuthenticated}
      id={plugin ? plugin.id : ""}
      pluginName={plugin ? plugin.name : ""}
      version={plugin ? plugin.version : ""}
      author={plugin ? plugin.author : ""}
      likes={plugin ? plugin.like : 0}
      description={plugin ? plugin.description : ""}
      readme={plugin ? plugin.readme : ""}
      images={plugin ? plugin.images : []}
      downloads={plugin ? plugin.downloads : 0}
      updatedDate={plugin ? plugin.updatedAt : undefined}
      workspaces={workspaces}
      modalVisible={modalVisible}
      handleClickLike={handleClickLike}
      handleClickChoose={handleClickChoose}
      onPluginInstall={onPluginInstall}
      onExtPluginInstall={onExtPluginInstall}
      onToggleModal={onToggleModal}
    />
  );
};

export default PluginDetail;
