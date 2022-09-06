import PluginDetailOrg from "@marketplace/components/organisms/PluginDetail";
import { useParams } from "react-router-dom";

export type Props = {
  selectedPluginId?: string;
};
const PluginDetail: React.FC<Props> = ({ selectedPluginId }) => {
  const { pluginId } = useParams();
  return <PluginDetailOrg pluginId={selectedPluginId ?? pluginId} />;
};

export default PluginDetail;
