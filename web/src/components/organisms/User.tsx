import UserPage from "@marketplace/components/molecules/UserPage";
import React from "react";

export type Props = {};
const User: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <UserPage isLoggedIn={isLoggedIn} />;
};

export default User;
