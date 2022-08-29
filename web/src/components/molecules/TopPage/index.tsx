import styled from "@emotion/styled";

import TitleBar from "@/components/atoms/TitleBar";
import Footer from "@/components/molecules/Common/Footer";
import Header from "@/components/molecules/Common/Header";

import TopPageContent, { Plugin } from "./TopPageContents";

export type { Plugin } from "./TopPageContents";

export type Props = {
  isLoggedIn: boolean;
  plugins?: Plugin[];
};

const TopPage: React.FC<Props> = ({ isLoggedIn, plugins }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <TitleBar />
      <TopPageContent plugins={plugins} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default TopPage;
