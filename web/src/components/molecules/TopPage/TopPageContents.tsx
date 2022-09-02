import styled from "@emotion/styled";
import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import SearchArea from "@marketplace/components/molecules/SearchArea";

export type Props = {
  plugins?: Plugin[];
  onSearch: (text: string) => void;
  isLoggedIn: boolean;
};

const TopPageContents: React.FC<Props> = ({ plugins, onSearch, isLoggedIn }) => {
  return (
    <Wrapper>
      <SearchArea onSearch={onSearch} isLoggedIn={isLoggedIn} />
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
