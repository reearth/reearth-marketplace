import TitleBar from "@marketplace/components/atoms/TitleBar";
import { type Plugin } from "@marketplace/components/molecules/PluginsList";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  isLoggedIn: boolean;
  plugins?: Plugin[];
  onSearch: (text: string) => void;
};

const TopPage: React.FC<Props> = ({ isLoggedIn, plugins, onSearch }) => {
  return (
    <div>
      <TitleBar />
      <TopPageContent plugins={plugins} onSearch={onSearch} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default TopPage;
