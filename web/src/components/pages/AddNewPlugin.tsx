import { AuthenticationRequiredPage } from "@marketplace/auth";
import PluginEditing from "@marketplace/components/organisms/Common/PluginUpload";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <PluginEditing />
    </AuthenticationRequiredPage>
  );
};

export default AddNewPlugin;
