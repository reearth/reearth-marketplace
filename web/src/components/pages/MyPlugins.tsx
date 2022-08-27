import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";
import MyPluginsOrg from "@/components/organisms/MyPlugins";

export type Props = {};

const MyPlugins: React.FC<Props> = () => {
  // TODO: Add AuthenticationRequiredPage
  return <MyPluginsOrg />;
};

// TODO: Add withAuthenticationRequired
export default MyPlugins;
