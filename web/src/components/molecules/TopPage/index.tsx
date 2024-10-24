import { type Plugin } from "@marketplace/components/molecules/PluginsList";
import { styled } from "@marketplace/theme";
import { Version } from "@marketplace/types";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  version?: Version | undefined;
  isLoggedIn: boolean;
  plugins?: Plugin[];
  isFavSelected: boolean;
  onSearch: (text: string) => void;
  handleFavButtonClick: (isFaved: boolean) => void;
  onPluginSelect?: (pluginId: string) => void;
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
  loadingPlugins: boolean;
  pageSize: number;
  setCurrentVersion: React.Dispatch<React.SetStateAction<Version>>;
};

const TopPage: React.FC<Props> = ({
  version,
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
  setCurrentVersion,
}) => {
  return (
    <Wrapper>
      <TopPageContent
        version={version}
        plugins={plugins}
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        isFavSelected={isFavSelected}
        handleFavButtonClick={handleFavButtonClick}
        onPluginSelect={onPluginSelect}
        totalCount={totalCount}
        page={page}
        onPageChange={onPageChange}
        loadingPlugins={loadingPlugins}
        pageSize={pageSize}
        setCurrentVersion={setCurrentVersion}
      />
    </Wrapper>
  );
};

export default TopPage;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.main.background};
`;
