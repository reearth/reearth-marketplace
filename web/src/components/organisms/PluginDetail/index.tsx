import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";
import useHooks from "./hooks";

export type Props = {
  pluginId?: string;
};
const PluginDetail: React.FC<Props> = ({ pluginId }) => {
  const { isAuthenticated } = useAuth();
  const handleClickChoose = () => {};
  const { plugin } = useHooks(pluginId ? pluginId : "");

  const handleClickLike = () => {};
  return (
    <PluginDetailPage
      // TODO: isLiked をconnect
      isLiked={false}
      isLoggedIn={isAuthenticated}
      id={plugin ? plugin.id : ""}
      pluginName={plugin ? plugin.name : ""}
      version={plugin ? plugin.version : ""}
      author={plugin ? plugin.author : ""}
      likes={plugin ? plugin.like : 0}
      images={plugin ? plugin.images : []}
      downloads={plugin ? plugin.downloads : 0}
      handleClickLike={handleClickLike}
      handleClickChoose={handleClickChoose}
    />
  );
};

export default PluginDetail;
