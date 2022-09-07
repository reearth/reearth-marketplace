import UserPage from "@marketplace/components/molecules/UserPage";
import React from "react";

import useHooks from "./hooks";
import type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {};
export type { Plugin };
export type myDataType = {
  id: string;
  description?: string | null;
  displayName?: string | null;
};
const User: React.FC<Props> = () => {
  const { myData, plugins } = useHooks();
  return <UserPage myData={myData} plugins={plugins} />;
};

export default User;
