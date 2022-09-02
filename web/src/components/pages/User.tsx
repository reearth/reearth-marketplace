import { AuthenticationRequiredPage } from "@marketplace/auth";
import UserOrg from "@marketplace/components/organisms/User";

export type Props = {};

const User: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <UserOrg />
    </AuthenticationRequiredPage>
  );
};

export default User;
