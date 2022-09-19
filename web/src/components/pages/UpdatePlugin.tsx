import { useParams } from "react-router-dom";

import { AuthenticationRequiredPage } from "@marketplace/auth";
import PluginEditing from "@marketplace/components/organisms/Common/PluginUpload";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  const { pluginId } = useParams();
  return (
    <AuthenticationRequiredPage>
      <PluginEditing pluginId={pluginId} />
    </AuthenticationRequiredPage>
  );
};
export default UpdatePlugin;
