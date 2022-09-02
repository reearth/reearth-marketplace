import styled from "@emotion/styled";
import TitleBar from "@marketplace/components/atoms/TitleBar";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/molecules/Common/Header";
import { type Plugin } from "@marketplace/components/molecules/PluginsList";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  isLoggedIn: boolean;
  plugins?: Plugin[];
  onSearch: (text: string) => void;
};

const TopPage: React.FC<Props> = ({ isLoggedIn, plugins, onSearch }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <TitleBar />
      <TopPageContent plugins={plugins} onSearch={onSearch} isLoggedIn={isLoggedIn} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default TopPage;
