import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";

export type Props = {};

const DeveloperRegistration: React.FC<Props> = () => {
  return <AuthenticationRequiredPage>DeveloperRegistration</AuthenticationRequiredPage>;
};

export default withAuthenticationRequired(DeveloperRegistration);
