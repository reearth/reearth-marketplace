import { AuthenticationRequiredPage } from "@marketplace/auth";
import MyPluginsOrganism from "@marketplace/components/organisms/MyPlugins";

export type Props = {};

const MyPlugins: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <MyPluginsOrganism />
    </AuthenticationRequiredPage>
  );
};

export default MyPlugins;
