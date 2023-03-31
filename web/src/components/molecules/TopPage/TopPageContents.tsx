import Loading from "@marketplace/components/atoms/Loading";
import Pagination from "@marketplace/components/atoms/Pagination";
import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import SearchArea from "@marketplace/components/molecules/SearchArea";
import { styled } from "@marketplace/theme";

export type Props = {
  plugins?: Plugin[];
  isLoggedIn: boolean;
  isFavSelected: boolean;
  totalCount: number;
  page: number;
  loadingPlugins: boolean;
  pageSize: number;
  onSearch: (text: string) => void;
  handleFavButtonClick: (isFaved: boolean) => void;
  onPluginSelect?: (pluginId: string) => void;
  onPageChange: (page: number) => void;
};

const TopPageContents: React.FC<Props> = ({
  plugins,
  isLoggedIn,
  isFavSelected,
  totalCount,
  page,
  loadingPlugins,
  pageSize,
  onSearch,
  handleFavButtonClick,
  onPluginSelect,
  onPageChange,
}) => {
  return (
    <Wrapper>
      <SearchArea
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        handleFavButtonClick={handleFavButtonClick}
        isFavSelected={isFavSelected}
      />
      {!loadingPlugins ? (
        <>
          <PluginsList plugins={plugins} onPluginSelect={onPluginSelect} />
          <Pagination
            current={page}
            total={totalCount}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </>
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
