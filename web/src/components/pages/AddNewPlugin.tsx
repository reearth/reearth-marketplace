import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";

export type Props = {};

const AddNewPlugin: React.FC<Props> = () => {
  return <AuthenticationRequiredPage>AddPlugin</AuthenticationRequiredPage>;
};

export default withAuthenticationRequired(AddNewPlugin);
