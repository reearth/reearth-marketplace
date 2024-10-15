import { useCallback, useState } from "react";

import TopPage from "@marketplace/components/molecules/TopPage";
import { App } from "@marketplace/types";

import useHooks from "./hooks";

export type Props = {
  accessToken?: string;
  app?: App | undefined;
  onPluginSelect?: (pluginId: string) => void;
};

type Version = "classic" | "visualizer";

const Top: React.FC<Props> = ({ app, accessToken, onPluginSelect }) => {
  const [searchText, updateSearchText] = useState<string>("");
  const [isFavSelected, toggleLiked] = useState<boolean>(false);
  const [_currentVersion, setCurrentVersion] = useState<Version>("classic");

  // TODO: pass `currentVersion` which might be visualizer or classic to hook to filter by version
  const pageSize = 40;

  const { plugins, isAuthenticated, totalCount, page, handlePageChange, loadingPlugins } = useHooks(
    pageSize,
    searchText,
    undefined,
    isFavSelected,
    accessToken,
  );

  const handleSearch = useCallback(
    (text: string) => {
      updateSearchText(text);
      handlePageChange(1);
    },
    [updateSearchText, handlePageChange],
  );

  const handleFavButtonClick = useCallback(
    (isFaved: boolean) => {
      toggleLiked(isFaved);
      handlePageChange(1);
    },
    [toggleLiked, handlePageChange],
  );

  return (
    <TopPage
      app={app}
      plugins={plugins}
      onSearch={handleSearch}
      isLoggedIn={isAuthenticated}
      handleFavButtonClick={handleFavButtonClick}
      isFavSelected={isFavSelected}
      onPluginSelect={onPluginSelect}
      totalCount={totalCount}
      page={page}
      onPageChange={handlePageChange}
      loadingPlugins={loadingPlugins}
      setCurrentVersion={setCurrentVersion}
      pageSize={pageSize}
    />
  );
};

export default Top;
