import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";

export type Props = {};

const MyPluginSetting: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>MypluginSetting</AuthenticationRequiredPage>
  );
};

export default withAuthenticationRequired(MyPluginSetting);
