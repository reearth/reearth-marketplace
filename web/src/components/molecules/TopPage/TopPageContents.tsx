import Loading from "@marketplace/components/atoms/Loading";
import Pagination from "@marketplace/components/atoms/Pagination";
import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import SearchArea from "@marketplace/components/molecules/SearchArea";
import Tabs, { TabsProps } from "@marketplace/components/atoms/Tabs";
import { useT } from "@marketplace/i18n";

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
  const t = useT();

  const tabs: TabsProps["items"] = [
    {
      key: "0",
      label: t("Classical"),
    },
    {
      key: "1",
      label: t("Visualizer"),
    },
  ];

  return (
    <div>
         <TabsWrapper>
        <Tabs defaultActiveKey="0" items={tabs} />
        </TabsWrapper>
        <Wrapper>
      <SearchArea 
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        handleFavButtonClick={handleFavButtonClick}
        isFavSelected={isFavSelected}
      />
      {!loadingPlugins ? (
        <>
          {/* <PluginsList plugins={plugins} onPluginSelect={onPluginSelect} /> */}
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
    </div>
    
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 72px;
  background: transparent;
`;

const TabsWrapper = styled.div`
  background: #070707;
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`

export default TopPageContents;
