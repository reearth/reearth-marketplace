import Loading from "@marketplace/components/atoms/Loading";
import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import SearchArea from "@marketplace/components/molecules/SearchArea";
import { styled } from "@marketplace/theme";

export type Props = {
  plugins?: Plugin[];
  isLoggedIn: boolean;
  isFavSelected: boolean;
  onSearch: (text: string) => void;
  handleFavButtonClick: (isFaved: boolean) => void;
  onPluginSelect?: (pluginId: string) => void;
};

const TopPageContents: React.FC<Props> = ({
  plugins,
  isLoggedIn,
  isFavSelected,
  onSearch,
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
      {plugins ? (
        <PluginsList plugins={plugins} onPluginSelect={onPluginSelect} />
      ) : (
        <Loading height={400} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 72px;
  background: transparent;
`;

export default TopPageContents;
