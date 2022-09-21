import { AuthenticationRequiredPage } from "@marketplace/auth";
import PluginUpload from "@marketplace/components/organisms/Common/PluginUpload";

export type Props = {
  pluginId?: string;
};

const PluginUploadPage: React.FC<Props> = ({ pluginId }) => {
  return (
    <AuthenticationRequiredPage>
      <PluginUpload pluginId={pluginId} />
    </AuthenticationRequiredPage>
  );
};

export default PluginUploadPage;
