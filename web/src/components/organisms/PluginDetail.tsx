import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";

export type Props = {};
const PluginDetail: React.FC<Props> = () => {
  const pluginName = "";
  const version = "";
  const author = "";
  const likes = 2;
  const downloads = 2;
  const handleClickChoose = () => {};

  return (
    <PluginDetailPage
      pluginName={pluginName}
      version={version}
      author={author}
      likes={likes}
      downloads={downloads}
      handleClickChoose={handleClickChoose}
    />
  );
};

export default PluginDetail;
