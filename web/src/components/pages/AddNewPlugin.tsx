import { AuthenticationRequiredPage } from "@marketplace/auth";
import PluginUpload from "@marketplace/components/organisms/Common/PluginUpload";
import { useParams } from "react-router-dom";

export type Props = {};

const PluginUploadPage: React.FC<Props> = () => {
  const { pluginId } = useParams();
  return (
    <AuthenticationRequiredPage>
      <PluginUpload pluginId={pluginId} />
    </AuthenticationRequiredPage>
  );
};

export default PluginUploadPage;
