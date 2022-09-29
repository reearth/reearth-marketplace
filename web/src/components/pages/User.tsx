import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticationRequiredPage } from "@marketplace/auth";
import UserOrganism from "@marketplace/components/organisms/User";

export type Props = {};

const User: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handlePluginSelect = useCallback(
    (id: string) => {
      navigate(`/plugins/${id}`);
    },
    [navigate],
  );

  return (
    <AuthenticationRequiredPage>
      <UserOrganism onPluginSelect={handlePluginSelect} />
    </AuthenticationRequiredPage>
  );
};

export default User;
