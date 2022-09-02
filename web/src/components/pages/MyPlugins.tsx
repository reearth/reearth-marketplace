import { AuthenticationRequiredPage } from "@marketplace/auth";
import MyPluginsOrg from "@marketplace/components/organisms/MyPlugins";

export type Props = {};

const MyPlugins: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <MyPluginsOrg />
    </AuthenticationRequiredPage>
  );
};

export default MyPlugins;
