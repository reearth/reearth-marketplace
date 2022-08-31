import styled from "@emotion/styled";

import PluginsList, { Plugin } from "@/components/molecules/PluginsList";
import SearchArea from "@/components/molecules/SearchArea";

export type Props = {
  plugins?: Plugin[];
  onSearch: (text: string) => void;
};

const TopPageContents: React.FC<Props> = ({ plugins, onSearch }) => {
  return (
    <Wrapper>
      <SearchArea onSearch={onSearch} />
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
