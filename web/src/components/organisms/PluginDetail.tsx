import React from "react";

import PluginDetailPage from "@/components/molecules/PluginDetailPage";

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
