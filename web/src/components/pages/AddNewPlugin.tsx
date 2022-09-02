import { AuthenticationRequiredPage, useAuth } from "@marketplace/auth";
import AddNewPluginOrg from "@marketplace/components/organisms/AddNewPlugin";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  const { isAuthenticated } = useAuth();
  return (
    <AuthenticationRequiredPage>
      <AddNewPluginOrg isLoggedIn={isAuthenticated} />
    </AuthenticationRequiredPage>
  );
};

export default AddNewPlugin;
