import { useParams } from "react-router-dom";

import PluginDetailOrg from "@marketplace/components/organisms/PluginDetail";

export type Props = {};

const PluginDetail: React.FC<Props> = () => {
  const { pluginId } = useParams();
  return <PluginDetailOrg pluginId={pluginId} />;
};

export default PluginDetail;
