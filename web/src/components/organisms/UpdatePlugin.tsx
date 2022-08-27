import React from "react";

import UpdatePluginPage from "@/components/molecules/UpdatePluginPage";

export type Props = {
  isLoggedIn?: boolean;
};
const UpdatePlugin: React.FC<Props> = ({ isLoggedIn }) => {
  return <UpdatePluginPage isLoggedIn={isLoggedIn} />;
};

export default UpdatePlugin;
