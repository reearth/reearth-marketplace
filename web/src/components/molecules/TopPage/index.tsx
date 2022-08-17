import styled from "@emotion/styled";

import TitleBar from "@/components/atoms/TitleBar";
import Header from "@/components/molecules/Common/Header";
import TopPageContent from "./TopPageContents";
import Footer from "@/components/molecules/Footer";

export type Props = {
  isLoggedIn: boolean;
};
const TopPage: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <TitleBar />
      <TopPageContent />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default TopPage;
