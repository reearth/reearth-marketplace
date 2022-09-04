import PluginDetailPage from "@marketplace/components/molecules/PluginDetailPage";
import React from "react";
import { useParams } from "react-router-dom";
import useHooks from "./hooks";

export type Props = {};
const PluginDetail: React.FC<Props> = () => {
  const handleClickChoose = () => {};
  const { pluginId = "" } = useParams();
  const { plugin } = useHooks(pluginId);

  return (
    <PluginDetailPage
      pluginName={plugin ? plugin.name : ""}
      version={plugin ? plugin.version : ""}
      author={plugin ? plugin.author : ""}
      likes={plugin ? plugin.like : 0}
      downloads={plugin ? plugin.downloads : 0}
      handleClickChoose={handleClickChoose}
    />
  );
};

export default PluginDetail;
