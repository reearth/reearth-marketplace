import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
  accessToken?: string;
  onInstall?: (pluginId: string) => void;
};
const PluginDetail: React.FC<Props> = ({
  pluginId,
  accessToken,
  onInstall,
}) => {
  const { isAuthenticated } = useAuth(accessToken);
  const handleClickChoose = () => {};
  const { plugin, onLike, onUnlike } = useHooks(pluginId ? pluginId : "");

  const handleClickLike = (isLiked: boolean) => {
    isLiked
      ? onUnlike(pluginId ? pluginId : "")
      : onLike(pluginId ? pluginId : "");
  };
  return (
    <PluginDetailPage
      // TODO: isLiked をconnect
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
      handleClickLike={handleClickLike}
      handleClickChoose={handleClickChoose}
      onInstall={onInstall}
    />
  );
};

export default PluginDetail;