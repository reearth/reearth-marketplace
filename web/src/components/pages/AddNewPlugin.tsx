import { AuthenticationRequiredPage } from "@marketplace/auth";
import PluginEditing from "@marketplace/components/organisms/Common/PluginEditing";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <PluginEditing newPlugin />
    </AuthenticationRequiredPage>
  );
};

export default AddNewPlugin;
