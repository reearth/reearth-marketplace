import PluginDetailOrg from "@/components/organisms/PluginDetail";

export type Props = {};
const PluginDetail: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <PluginDetailOrg isLoggedIn={isLoggedIn} />;
};

export default PluginDetail;
