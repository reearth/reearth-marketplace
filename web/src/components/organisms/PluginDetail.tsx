import React from "react";

import PluginDetailPage from "@/components/molecules/PluginDetailPage";

export type Props = {
  isLoggedIn: boolean;
};
const PluginDetail: React.FC<Props> = ({ isLoggedIn }) => {
  return <PluginDetailPage isLoggedIn={isLoggedIn} />;
};

export default PluginDetail;
