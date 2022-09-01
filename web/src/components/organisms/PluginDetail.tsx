import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

export type Props = {
  isLoggedIn: boolean;
};
const PluginDetail: React.FC<Props> = ({ isLoggedIn }) => {
  const pluginName = "";
  const version = "";
  const developerLink = "";
  const publishedDate = "";
  return (
    <PluginDetailPage
      isLoggedIn={isLoggedIn}
      pluginName={pluginName}
      version={version}
      developerLink={developerLink}
      publishedDate={publishedDate}
    />
  );
};

export default PluginDetail;
