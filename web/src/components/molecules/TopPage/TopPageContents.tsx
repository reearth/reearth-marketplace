import { Pagination } from "antd";

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
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
  loadingPlugins: boolean;
  pageSize: number;
};

const TopPageContents: React.FC<Props> = ({
  plugins,
  isLoggedIn,
  isFavSelected,
  onSearch,
  handleFavButtonClick,
  onPluginSelect,
  totalCount,
  page,
  onPageChange,
  loadingPlugins,
  pageSize,
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
