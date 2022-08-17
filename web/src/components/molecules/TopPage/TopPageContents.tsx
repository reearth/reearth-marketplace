import styled from "@emotion/styled";

import SearchArea from "@/components/molecules/SearchArea";
import PluginsList from "@/components/molecules/PluginsList";

export type Props = {};
const TopPageContents: React.FC<Props> = () => {
  return (
    <Wrapper>
      <SearchArea />
      <PluginsList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
`;

export default TopPageContents;
