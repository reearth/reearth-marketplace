import styled from "@emotion/styled";

import TitleBar from "@/components/atoms/TitleBar";
import Footer from "@/components/molecules/Common/Footer";
import Header from "@/components/molecules/Common/Header";
import { type Plugin } from "@/components/molecules/PluginsList";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@/components/molecules/PluginsList";
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
      <TopPageContent plugins={plugins} onSearch={onSearch} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default TopPage;
