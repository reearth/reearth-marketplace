// import { withAuthenticationRequired, AuthenticationRequiredPage } from "@marketplace/auth";
import UserOrg from "@marketplace/components/organisms/User";

export type Props = {};

const User: React.FC<Props> = () => {
  // TODO: add AuthenticationRequiredPage
  return <UserOrg />;
};

// TODO: withAuthenticationRequired
export default User;
