import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";

export type Props = {};

const DeveloperRegistration: React.FC<Props> = () => {
  return <AuthenticationRequiredPage>hoge</AuthenticationRequiredPage>;
};

export default withAuthenticationRequired(DeveloperRegistration);
