import PluginDetailOrg from "@marketplace/components/organisms/PluginDetail";
import { useParams } from "react-router-dom";

export type Props = {
  selectedPluginId?: string;
  accessToken?: string;
  installedPlugins?: {
    id: string;
    version: string;
  }[];
  onInstall?: (pluginId: string) => void;
  onBack?: () => void;
};

const PluginDetail: React.FC<Props> = ({
  selectedPluginId,
  accessToken,
  installedPlugins,
  onInstall,
  onBack,
}) => {
  const { pluginId } = useParams();
  return (
    <PluginDetailOrg
      pluginId={selectedPluginId ?? pluginId}
      accessToken={accessToken}
      installedPlugins={installedPlugins}
      onPluginInstall={onInstall}
      onBack={onBack}
    />
  );
};

export default PluginDetail;
