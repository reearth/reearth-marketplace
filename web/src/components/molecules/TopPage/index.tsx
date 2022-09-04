import TitleBar from "@marketplace/components/atoms/TitleBar";
import { type Plugin } from "@marketplace/components/molecules/PluginsList";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  // isLoggedIn: boolean;
  plugins?: Plugin[];
  // onSearch: (text: string) => void;
};

const TopPage: React.FC<Props> = ({ plugins }) => {
  return (
    <div>
      <TitleBar />
      <TopPageContent plugins={plugins} />
    </div>
  );
};

export default TopPage;
