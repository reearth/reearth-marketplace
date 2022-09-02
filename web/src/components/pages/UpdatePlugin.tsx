import { AuthenticationRequiredPage } from "@marketplace/auth";
import UpdatePluginOrg from "@marketplace/components/organisms/UpdatePlugin";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <UpdatePluginOrg />
    </AuthenticationRequiredPage>
  );
};
export default UpdatePlugin;
