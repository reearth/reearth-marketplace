import Top from "@marketplace/components/organisms/Top";

export type Props = {
  showBanner?: boolean;
  accessToken?: string;
  onPluginSelect?: (pluginId: string) => void;
};

const Root: React.FC<Props> = ({ showBanner, accessToken, onPluginSelect }) => {
  return <Top showBanner={showBanner} accessToken={accessToken} onPluginSelect={onPluginSelect} />;
};

export default Root;
