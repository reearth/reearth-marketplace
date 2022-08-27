import { withAuthenticationRequired, AuthenticationRequiredPage } from "@/auth";
import UserOrg from "@/components/organisms/User";

export type Props = {};

const User: React.FC<Props> = () => {
  // TODO: add AuthenticationRequiredPage
  return <UserOrg />;
};

// TODO: withAuthenticationRequired
export default User;
