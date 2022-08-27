import React from "react";

import UserPage from "@/components/molecules/UserPage";

export type Props = {
  isLoggedIn?: boolean;
};
const User: React.FC<Props> = ({ isLoggedIn }) => {
  return <UserPage isLoggedIn={isLoggedIn} />;
};

export default User;
