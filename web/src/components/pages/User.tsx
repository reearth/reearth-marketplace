import { AuthenticationRequiredPage } from "@marketplace/auth";
import UserOrganism from "@marketplace/components/organisms/User";

export type Props = {};

const User: React.FC<Props> = () => {
  return (
    <AuthenticationRequiredPage>
      <UserOrganism />
    </AuthenticationRequiredPage>
  );
};

export default User;
