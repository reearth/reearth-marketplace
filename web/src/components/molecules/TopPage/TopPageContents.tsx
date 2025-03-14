import Loading from "@marketplace/components/atoms/Loading";
import Pagination from "@marketplace/components/atoms/Pagination";
import Tabs from "@marketplace/components/atoms/Tabs";
import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import SearchArea from "@marketplace/components/molecules/SearchArea";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { Version } from "@marketplace/types";

type TabKeys = "0" | "1";

type TabItem = {
  key: TabKeys;
  label: string;
  value: Version;
};

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
  setCurrentVersion: React.Dispatch<React.SetStateAction<Version>>;
  version?: Version | undefined;
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
  setCurrentVersion,
  version,
}) => {
  const t = useT();
  const tabs: TabItem[] = [
    {
      key: "0",
      label: t("Classic"),
      value: "classic",
    },
    {
      key: "1",
      label: t("Visualizer"),
      value: "visualizer",
    },
  ];

  return (
    <div>
      {!version && (
        <TabsWrapper className="homepage-tabs">
          <Tabs
            defaultActiveKey="0"
            items={tabs}
            onChange={(activeKey: string) => {
              const selectedTab = tabs.find(tab => tab.key === activeKey);
              if (selectedTab) {
                setCurrentVersion(selectedTab.value);
              } else {
                setCurrentVersion("classic");
              }
            }}
          />
        </TabsWrapper>
      )}
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
    </div>
  );
};

const TabsWrapper = styled.div`
  background: #070707;
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 72px;
  background: transparent;
`;

export default TopPageContents;
