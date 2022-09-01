// import { withAuthenticationRequired, AuthenticationRequiredPage } from "@marketplace/auth";
import AddNewPluginOrg from "@marketplace/components/organisms/AddNewPlugin";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  // TODO: add AuthenticationRequiredPage
  return <AddNewPluginOrg isLoggedIn={false} />;
};

// TODO: withAuthenticationRequired
export default AddNewPlugin;
