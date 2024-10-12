import TopPage from "@marketplace/components/molecules/TopPage";
import { useCallback, useState } from "react";
import useHooks from "./hooks";

export type Props = {
  showBanner?: boolean;
  accessToken?: string;
  onPluginSelect?: (pluginId: string) => void;
};

type Version = "classic" | "visualizer";

const Top: React.FC<Props> = ({ showBanner, accessToken, onPluginSelect }) => {
  const [searchText, updateSearchText] = useState<string>("");
  const [isFavSelected, toggleLiked] = useState<boolean>(false);
  const [currentVersion, setCurrentVersion] = useState<Version>("classic");

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
      setCurrentVersion={setCurrentVersion}
      pageSize={pageSize}
    />
  );
};

export default Top;
