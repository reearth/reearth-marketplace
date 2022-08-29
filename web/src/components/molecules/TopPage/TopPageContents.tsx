import styled from "@emotion/styled";

import PluginsList, { Plugin } from "@/components/molecules/PluginsList";
import SearchArea from "@/components/molecules/SearchArea";

export type { Plugin } from "@/components/molecules/PluginsList";

export type Props = {
  plugins?: Plugin[];
};

const TopPageContents: React.FC<Props> = ({ plugins }) => {
  return (
    <Wrapper>
      <SearchArea />
      <PluginsList plugins={plugins} />
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
