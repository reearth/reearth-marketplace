import TitleBar from "@marketplace/components/atoms/TitleBar";
import { type Plugin } from "@marketplace/components/molecules/PluginsList";

import TopPageContent from "./TopPageContents";

export type { Plugin } from "@marketplace/components/molecules/PluginsList";
export type Props = {
  // isLoggedIn: boolean;
  plugins?: Plugin[];
  showBanner?: boolean;
  // onSearch: (text: string) => void;
};

const TopPage: React.FC<Props> = ({ plugins, showBanner }) => {
  return (
    <div>
      {showBanner && <TitleBar />}
      <TopPageContent plugins={plugins} />
    </div>
  );
};

export default TopPage;
