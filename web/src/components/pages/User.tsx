import { AuthenticationRequiredPage } from "@marketplace/auth";
import UserOrganism from "@marketplace/components/organisms/User";

export type Props = {
  onPluginSelect?: (pluginId: string) => void;
};

const User: React.FC<Props> = ({ onPluginSelect }) => {
  return (
    <AuthenticationRequiredPage>
      <UserOrganism onPluginSelect={onPluginSelect} />
    </AuthenticationRequiredPage>
  );
};

export default User;
