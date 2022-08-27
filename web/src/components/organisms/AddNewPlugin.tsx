import React from "react";

import AddNewPluginPage from "@/components/molecules/AddNewPluginPage";

export type Props = {
  isLoggedIn?: boolean;
};
const AddNewPlugin: React.FC<Props> = ({ isLoggedIn }) => {
  return <AddNewPluginPage isLoggedIn={isLoggedIn} />;
};

export default AddNewPlugin;
