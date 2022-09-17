import { useParams } from "react-router-dom";

import { AuthenticationRequiredPage } from "@marketplace/auth";
import UpdatePluginOrg from "@marketplace/components/organisms/UpdatePlugin";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  const { pluginId } = useParams();
  return (
    <AuthenticationRequiredPage>
      <UpdatePluginOrg pluginId={pluginId} />
    </AuthenticationRequiredPage>
  );
};
export default UpdatePlugin;
