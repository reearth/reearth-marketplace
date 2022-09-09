import { useAuth } from "@marketplace/auth/hooks";
import TopPage from "@marketplace/components/molecules/TopPage";
import { useState } from "react";

import useHooks from "./hooks";

export type Props = {
  showBanner?: boolean;
  onPluginSelect?: (pluginId: string) => void;
};

const Top: React.FC<Props> = ({ showBanner, onPluginSelect }) => {
  const { isAuthenticated } = useAuth();
  const [searchText, updateSearchText] = useState<string>("");
  const [isFavSelected, toggleLiked] = useState<boolean>(false);
  const handleSearch = (text: string) => {
    updateSearchText(text);
  };
  const handleFavButtonClick = (isFaved: boolean) => {
    toggleLiked(isFaved);
  };
  const { plugins } = useHooks(searchText, undefined, isFavSelected);
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
