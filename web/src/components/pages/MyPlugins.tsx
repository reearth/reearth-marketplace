import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";

export type Props = {};

const MyPlugins: React.FC<Props> = () => {
  return <AuthenticationRequiredPage>MyPlugins</AuthenticationRequiredPage>;
};

export default withAuthenticationRequired(MyPlugins);
