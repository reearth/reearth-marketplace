// import { withAuthenticationRequired, AuthenticationRequiredPage } from "@marketplace/auth";
import UpdatePluginOrg from "@marketplace/components/organisms/UpdatePlugin";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  // TODO: add AuthenticationRequiredPage
  return <UpdatePluginOrg />;
};
// TODO: withAuthenticationRequired
export default UpdatePlugin;
