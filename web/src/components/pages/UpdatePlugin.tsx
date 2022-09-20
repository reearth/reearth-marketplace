import { useParams } from "react-router-dom";

import { AuthenticationRequiredPage } from "@marketplace/auth";
import UpdatePluginOrganism from "@marketplace/components/organisms/UpdatePlugin";

export type Props = {};
const EditPlugin: React.FC<Props> = () => {
  const { pluginId } = useParams();
  return (
    <AuthenticationRequiredPage>
      <UpdatePluginOrganism pluginId={pluginId} />
    </AuthenticationRequiredPage>
  );
};
export default EditPlugin;
