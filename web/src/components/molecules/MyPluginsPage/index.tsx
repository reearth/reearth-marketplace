import styled from "@emotion/styled";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/molecules/Common/Header";

import MyPluginsContent from "./MyPluginsContent";

export type Props = {
  isLoggedIn: boolean;
};
const TopPage: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <MyPluginsContent />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default TopPage;
