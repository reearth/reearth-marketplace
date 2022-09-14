import Top from "@marketplace/components/organisms/Top";

export type Props = {
  showBanner?: boolean;
  onPluginSelect?: (pluginId: string) => void;
};

const Root: React.FC<Props> = ({ showBanner, onPluginSelect }) => {
  return <Top showBanner={showBanner} onPluginSelect={onPluginSelect} />;
};

export default Root;
