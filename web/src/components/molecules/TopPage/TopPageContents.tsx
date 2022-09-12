import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import SearchArea from "@marketplace/components/molecules/SearchArea";
import { styled } from "@marketplace/theme";

export type Props = {
  plugins?: Plugin[];
  onSearch: (text: string) => void;
  isLoggedIn: boolean;
  isFavSelected: boolean;
  handleFavButtonClick: (isFaved: boolean) => void;
  onPluginSelect?: (pluginId: string) => void;
};

const TopPageContents: React.FC<Props> = ({
  plugins,
  onSearch,
  isLoggedIn,
  isFavSelected,
  handleFavButtonClick,
  onPluginSelect,
}) => {
  return (
    <Wrapper>
      <SearchArea
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        handleFavButtonClick={handleFavButtonClick}
        isFavSelected={isFavSelected}
      />
      <PluginsList plugins={plugins} onPluginSelect={onPluginSelect} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
  background: transparent;
`;

export default TopPageContents;
