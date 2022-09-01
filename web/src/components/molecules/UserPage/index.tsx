import styled from "@emotion/styled";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/molecules/Common/Header";

import UserPageContent from "./UserPageContent";

export type Props = {
  isLoggedIn: boolean;
};
const UserPage: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <UserPageContent />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default UserPage;
