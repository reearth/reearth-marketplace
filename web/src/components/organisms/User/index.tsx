import type { Plugin } from "@marketplace/components/molecules/PluginsList";
import UserPage from "@marketplace/components/molecules/UserPage";

import useHooks from "./hooks";

export type Props = {
  onPluginSelect?: (pluginId: string) => void;
};

export type { Plugin };

export type MyDataType = {
  id: string;
  description?: string | null;
  displayName?: string | null;
};

const User: React.FC<Props> = ({ onPluginSelect }) => {
  const { myData, plugins } = useHooks();
  return <UserPage myData={myData} plugins={plugins} onPluginSelect={onPluginSelect} />;
};

export default User;
