import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

export type Props = {
  pluginId?: string;
};

const PluginDetail: React.FC<Props> = ({ pluginId }) => {
  const { isAuthenticated } = useAuth();
  const [pluginName, pluginVersion] = pluginId?.split("~") ?? [];
  // const pluginName = "";
  // const version = "";
  const likes = 0;
  const downloads = 0;
  const author = "";
  const isLiked = false;
  const images: string[] = [];
  const handleClickChoose = () => {};
  const handleClickLike = () => {};
  return (
    <PluginDetailPage
      id={pluginId ? pluginId : ""}
      pluginName={pluginName}
      version={pluginVersion}
      author={author}
      likes={likes}
      isLiked={isLiked}
      images={images}
      downloads={downloads}
      isLoggedIn={isAuthenticated}
      handleClickLike={handleClickLike}
      handleClickChoose={handleClickChoose}
    />
  );
};

export default PluginDetail;
