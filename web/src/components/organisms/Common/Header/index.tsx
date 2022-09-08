import { useAuth } from "@marketplace/auth/hooks";
import HeaderOrganism from "@marketplace/components/molecules/Common/Header";
import React from "react";
// import { useNavigate } from "react-router-dom";

export type Props = {
  myUserId?: string;
};
const Header: React.FC<Props> = () => {
  const { login, logout, isAuthenticated } = useAuth();

  return <HeaderOrganism isLoggedIn={isAuthenticated} login={login} logout={logout} />;
};

export default Header;
