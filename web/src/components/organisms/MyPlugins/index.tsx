import MyPluginsPage from "@marketplace/components/molecules/MyPluginsPage";
import React from "react";

import useHooks from "./hooks";

export type Plugin = {
  id: string;
  name: string;
  active: boolean;
  updateAt: Date;
  version: string;
};
export type Props = {};
const MyPlugins: React.FC<Props> = () => {
  const { plugins, onToggleActive } = useHooks();
  const handlePublishClick = (id: string, active: boolean) => {
    onToggleActive(id, !active);
  };
  return <MyPluginsPage plugins={plugins} handlePublishClick={handlePublishClick} />;
};

export default MyPlugins;
