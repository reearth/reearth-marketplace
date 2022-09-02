import { AuthenticationRequiredPage } from "@marketplace/auth";
import AddNewPluginOrg from "@marketplace/components/organisms/AddNewPlugin";

export type Props = {
  isLoggedIn: boolean;
};

const AddNewPlugin: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <AuthenticationRequiredPage>
      <AddNewPluginOrg isLoggedIn={isLoggedIn} />
    </AuthenticationRequiredPage>
  );
};

export default AddNewPlugin;
