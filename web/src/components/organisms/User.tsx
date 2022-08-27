import React from "react";

import UserPage from "@/components/molecules/UserPage";

export type Props = {
  isLoggedIn?: boolean;
};
const UserPage: React.FC<Props> = ({ isLoggedIn }) => {
  return <UserPage isLoggedIn={isLoggedIn} />;
};

export default UserPage;
