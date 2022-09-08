import TitleBar from "@marketplace/components/atoms/TitleBar";
import { type Plugin } from "@marketplace/components/molecules/PluginsList";
import { styled } from "@marketplace/theme";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  isLoggedIn: boolean;
  plugins?: Plugin[];
  showBanner?: boolean;
  isFavSelected: boolean;
  onSearch: (text: string) => void;
  handleFavButtonClick: (isFaved: boolean) => void;
};

const TopPage: React.FC<Props> = ({
  plugins,
  showBanner,
  isLoggedIn,
  isFavSelected,
  onSearch,
  handleFavButtonClick,
}) => {
  return (
    <Wrapper>
      {showBanner && <TitleBar />}
      <TopPageContent
        plugins={plugins}
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        isFavSelected={isFavSelected}
        handleFavButtonClick={handleFavButtonClick}
      />
    </Wrapper>
  );
};

export default TopPage;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.main.background};
`;
