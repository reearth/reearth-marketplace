import styled from "@emotion/styled";

import Footer from "@/components/molecules/Common/Footer";
import Header from "@/components/molecules/Common/Header";

import AddNewPluginContent from "./AddNewPluginContent";

export type Props = {
  isLoggedIn: boolean;
};
const AddNewPluginPage: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <AddNewPluginContent />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background: rgba(250, 250, 250, 1);
`;

export default AddNewPluginPage;
