import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  return <AuthenticationRequiredPage>UpdatePlugin</AuthenticationRequiredPage>;
};

export default withAuthenticationRequired(UpdatePlugin);
