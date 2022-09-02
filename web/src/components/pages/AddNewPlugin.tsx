import { AuthenticationRequiredPage } from "@marketplace/auth";
import AddNewPluginOrg from "@marketplace/components/organisms/AddNewPlugin";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <AddNewPluginOrg isLoggedIn={false} />
    </AuthenticationRequiredPage>
  );
};

export default AddNewPlugin;
