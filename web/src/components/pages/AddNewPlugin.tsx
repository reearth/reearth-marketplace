import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";
import AddNewPluginOrg from "@/components/organisms/AddNewPlugin";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  // TODO: add AuthenticationRequiredPage
  return <AddNewPluginOrg />;
};

// TODO: withAuthenticationRequired
export default AddNewPlugin;
