import Header from "@/components/organisms/Common/Header";
import styled from "@emotion/styled";

export type Props = {
  isLoggedIn: boolean;
};
const TopPage: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      {/* <TitleBar />
      <SearchArea />
      <PluginLists /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default TopPage;
