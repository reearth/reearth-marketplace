import React from "react";

import UserPage from "@/components/molecules/UserPage";

export type Props = {};
const User: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <UserPage isLoggedIn={isLoggedIn} />;
};

export default User;
