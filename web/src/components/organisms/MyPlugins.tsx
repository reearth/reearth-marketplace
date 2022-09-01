import React from "react";

import MyPluginsPage from "@/components/molecules/MyPluginsPage";

export type Props = {};
const MyPlugins: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <MyPluginsPage isLoggedIn={isLoggedIn} />;
};

export default MyPlugins;
