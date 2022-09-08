import PluginDetailOrg from "@marketplace/components/organisms/PluginDetail";
import { useParams } from "react-router-dom";

export type Props = {
  selectedPluginId?: string;
  accessToken?: string;
  onInstall?: (pluginId: string) => void;
};

const PluginDetail: React.FC<Props> = ({ selectedPluginId, accessToken, onInstall }) => {
  const { pluginId } = useParams();
  return (
    <PluginDetailOrg
      pluginId={selectedPluginId ?? pluginId}
      accessToken={accessToken}
      onPluginInstall={onInstall}
    />
  );
};

export default PluginDetail;
