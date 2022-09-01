import MyPluginsPage from "@marketplace/components/molecules/MyPluginsPage";
import React from "react";

export type Props = {};
const MyPlugins: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <MyPluginsPage isLoggedIn={isLoggedIn} />;
};

export default MyPlugins;
