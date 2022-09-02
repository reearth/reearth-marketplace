import { useAuth } from "@marketplace/auth";
import MyPluginsPage from "@marketplace/components/molecules/MyPluginsPage";
import React from "react";

export type Props = {};
const MyPlugins: React.FC<Props> = () => {
  const { isAuthenticated } = useAuth();

  return <MyPluginsPage isLoggedIn={isAuthenticated} />;
};

export default MyPlugins;
