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

  const { plugins, isAuthenticated } = useHooks(searchText, undefined, isFavSelected, accessToken);

  const handleSearch = useCallback((text: string) => {
    updateSearchText(text);
  }, []);

  const handleFavButtonClick = useCallback((isFaved: boolean) => {
    toggleLiked(isFaved);
  }, []);

  return (
    <TopPage
      plugins={plugins}
      showBanner={showBanner}
      onSearch={handleSearch}
      isLoggedIn={isAuthenticated}
      handleFavButtonClick={handleFavButtonClick}
      isFavSelected={isFavSelected}
      onPluginSelect={onPluginSelect}
    />
  );
};

export default Top;
