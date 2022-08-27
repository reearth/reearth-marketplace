import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";
import UpdatePluginOrg from "@/components/organisms/UpdatePlugin";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  // TODO: add AuthenticationRequiredPage
  return <UpdatePluginOrg />;
};
// TODO: withAuthenticationRequired
export default UpdatePlugin;
