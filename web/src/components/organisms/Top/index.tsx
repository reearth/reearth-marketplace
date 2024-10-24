import { useCallback, useState } from "react";

import TopPage from "@marketplace/components/molecules/TopPage";
import { Version } from "@marketplace/types";

import useHooks from "./hooks";

export type Props = {
  accessToken?: string;
  version?: Version | undefined;
  onPluginSelect?: (pluginId: string) => void;
};

const Top: React.FC<Props> = ({ accessToken, onPluginSelect, version }) => {
  const [searchText, updateSearchText] = useState<string>("");
  const [isFavSelected, toggleLiked] = useState<boolean>(false);
  const [currentVersion, setCurrentVersion] = useState<Version>(version ?? "classic");

  const pageSize = 40;

  const { plugins, isAuthenticated, totalCount, page, handlePageChange, loadingPlugins } = useHooks(
    {
      pageSize,
      searchText,
      sort: undefined,
      liked: isFavSelected,
      accessToken,
    },
  );

  const filteredPlugins = plugins
    ? plugins.filter(plugin => plugin.core === (currentVersion === "classic")) // NOTE: 'core' is a boolean value
    : [];

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
      version={version}
      plugins={filteredPlugins}
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
