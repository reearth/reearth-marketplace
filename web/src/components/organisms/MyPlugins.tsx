import React from "react";

import MyPluginsPage from "@/components/molecules/MyPluginsPage";

export type Props = {
  isLoggedIn?: boolean;
};
const MyPlugins: React.FC<Props> = ({ isLoggedIn }) => {
  return <MyPluginsPage isLoggedIn={isLoggedIn} />;
};

export default MyPlugins;
