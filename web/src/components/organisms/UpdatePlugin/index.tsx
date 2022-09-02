import UpdatePluginPage from "@marketplace/components/molecules/UpdatePluginPage";
import React from "react";

export type Props = {};
const UpdatePlugin: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <UpdatePluginPage isLoggedIn={isLoggedIn} />;
};

export default UpdatePlugin;
