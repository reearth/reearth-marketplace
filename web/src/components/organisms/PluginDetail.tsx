import { useAuth } from "@marketplace/auth";
import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

export type Props = {};
const PluginDetail: React.FC<Props> = () => {
  const pluginName = "";
  const version = "";
  const developerLink = "";
  const publishedDate = "";
  const { isAuthenticated } = useAuth();
  const handleClickChoose = () => {};

  return (
    <PluginDetailPage
      isLoggedIn={isAuthenticated}
      pluginName={pluginName}
      version={version}
      developerLink={developerLink}
      publishedDate={publishedDate}
      handleClickChoose={handleClickChoose}
    />
  );
};

export default PluginDetail;
