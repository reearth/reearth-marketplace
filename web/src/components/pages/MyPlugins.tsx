// import { withAuthenticationRequired, AuthenticationRequiredPage } from "@marketplace/auth";
import MyPluginsOrg from "@marketplace/components/organisms/MyPlugins";

export type Props = {};

const MyPlugins: React.FC<Props> = () => {
  // TODO: Add AuthenticationRequiredPage
  return <MyPluginsOrg />;
};

// TODO: Add withAuthenticationRequired
export default MyPlugins;
