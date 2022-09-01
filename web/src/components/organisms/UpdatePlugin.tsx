import React from "react";

import UpdatePluginPage from "@/components/molecules/UpdatePluginPage";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <UpdatePluginPage isLoggedIn={isLoggedIn} />;
};

export default UpdatePlugin;
