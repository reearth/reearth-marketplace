import MyPluginsPage from "@marketplace/components/molecules/MyPluginsPage";

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
  const { plugins, handleTogglePublish } = useHooks();

  return <MyPluginsPage plugins={plugins} onPublish={handleTogglePublish} />;
};

export default MyPlugins;
