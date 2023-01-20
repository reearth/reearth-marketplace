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
  const pageSize = 40;
  const { myData, plugins, totalCount, page, handlePageChange } = useHooks(pageSize);
  return (
    <UserPage
      myData={myData}
      plugins={plugins}
      onPluginSelect={onPluginSelect}
      totalCount={totalCount}
      page={page}
      onPageChange={handlePageChange}
      pageSize={pageSize}
    />
  );
};

export default User;
