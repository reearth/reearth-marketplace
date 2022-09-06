import PluginsList, { Plugin } from "@marketplace/components/molecules/PluginsList";
import { styled } from "@marketplace/theme";
// import SearchArea from "@marketplace/components/molecules/SearchArea";

export type Props = {
  plugins?: Plugin[];
  // onSearch: (text: string) => void;
  // isLoggedIn: boolean;
};

const TopPageContents: React.FC<Props> = ({
  plugins,
  // onSearch,
  // isLoggedIn,
}) => {
  return (
    <Wrapper>
      {/* TODO: Search Bar */}
      {/* <SearchArea onSearch={onSearch} isLoggedIn={isLoggedIn} /> */}
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
