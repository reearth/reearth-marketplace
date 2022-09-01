import styled from "@emotion/styled";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/molecules/Common/Header";

export type Props = {
  isLoggedIn: boolean;
};
const UpdatePluginPage: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default UpdatePluginPage;
