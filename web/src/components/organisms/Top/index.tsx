import { useCallback, useState } from "react";

import TopPage from "@marketplace/components/molecules/TopPage";

import useHooks from "./hooks";

export type Props = {
  showBanner?: boolean;
  accessToken?: string;
  onPluginSelect?: (pluginId: string) => void;
};

const Top: React.FC<Props> = ({ showBanner, accessToken, onPluginSelect }) => {
  const [searchText, updateSearchText] = useState<string>("");
  const [isFavSelected, toggleLiked] = useState<boolean>(false);

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
      plugins={plugins}
      showBanner={showBanner}
      onSearch={handleSearch}
      isLoggedIn={isAuthenticated}
      handleFavButtonClick={handleFavButtonClick}
      isFavSelected={isFavSelected}
      onPluginSelect={onPluginSelect}
      totalCount={totalCount}
      page={page}
      onPageChange={handlePageChange}
      loadingPlugins={loadingPlugins}
      pageSize={pageSize}
    />
  );
};

export default Top;
