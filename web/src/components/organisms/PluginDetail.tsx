import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

export type Props = {};

const PluginDetail: React.FC<Props> = () => {
  const pluginName = "";
  const version = "";
  const developerLink = "";
  const publishedDate = "";

  return (
    <PluginDetailPage
      pluginName={pluginName}
      version={version}
      developerLink={developerLink}
      publishedDate={publishedDate}
    />
  );
};

export default PluginDetail;
