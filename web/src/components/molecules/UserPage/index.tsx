import styled from "@emotion/styled";

import Footer from "@/components/molecules/Common/Footer";
import Header from "@/components/molecules/Common/Header";

export type Props = {
  isLoggedIn: boolean;
};
const UserPage: React.FC<Props> = ({ isLoggedIn }) => {
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

export default UserPage;
