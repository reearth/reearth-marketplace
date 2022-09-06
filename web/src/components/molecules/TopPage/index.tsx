import TitleBar from "@marketplace/components/atoms/TitleBar";
import { type Plugin } from "@marketplace/components/molecules/PluginsList";
import { styled } from "@marketplace/theme";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  // isLoggedIn: boolean;
  plugins?: Plugin[];
  showBanner?: boolean;
  // onSearch: (text: string) => void;
};

const TopPage: React.FC<Props> = ({ plugins, showBanner }) => {
  return (
    <Wrapper>
      {showBanner && <TitleBar />}
      <TopPageContent plugins={plugins} />
    </Wrapper>
  );
};

export default TopPage;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.main.background};
`;
