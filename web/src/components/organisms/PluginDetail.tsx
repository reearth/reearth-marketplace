import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

export type Props = {
  pluginId?: string;
};

const PluginDetail: React.FC<Props> = ({ pluginId }) => {
  const [pluginName, pluginVersion] = pluginId?.split("~") ?? [];
  // const pluginName = "";
  // const version = "";
  const developerLink = "";
  const publishedDate = "";
  const handleClickChoose = () => {};

  return (
    <PluginDetailPage
      pluginName={pluginName}
      version={pluginVersion}
      developerLink={developerLink}
      publishedDate={publishedDate}
      handleClickChoose={handleClickChoose}
    />
  );
};

export default PluginDetail;
