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
  const pageSize = 10;
  const { plugins, handleTogglePublish, handlePageChange, totalCount, page } = useHooks(pageSize);

  return (
    <MyPluginsPage
      plugins={plugins}
      onPublish={handleTogglePublish}
      onPageChange={handlePageChange}
      totalCount={totalCount ?? 0}
      page={page}
      pageSize={pageSize}
    />
  );
};

export default MyPlugins;
